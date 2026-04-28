import {
  calibrationBucket,
  confidenceToPct,
  emptyConfidenceCalibrationState,
  updateConfidenceCalibrationState,
} from "../src/core/confidence-calibration.js";

describe("confidence calibration", () => {
  it("maps 1-5 confidence to percentage buckets", () => {
    expect(confidenceToPct(1)).toBe(20);
    expect(confidenceToPct(5)).toBe(100);
    expect(confidenceToPct(9)).toBe(100);
    expect(confidenceToPct(0)).toBeNull();
  });

  it("classifies overconfidence, underconfidence and calibrated answers", () => {
    expect(calibrationBucket({ confidencePct: 100, correct: false })).toBe("overconfident");
    expect(calibrationBucket({ confidencePct: 40, correct: true })).toBe("underconfident");
    expect(calibrationBucket({ confidencePct: 20, correct: false })).toBe("calibrated");
    expect(calibrationBucket({ confidencePct: 80, correct: true })).toBe("calibrated");
  });

  it("updates per-concept calibration stats deterministically", () => {
    let state = emptyConfidenceCalibrationState();
    let result = updateConfidenceCalibrationState(state, {
      conceptKey: "lesson_11::Array",
      lessonId: "lesson_11",
      conceptName: "Array",
      confidence: 5,
      correct: false,
      timestamp: 1_700_000_000_000,
    });
    state = result.state;
    result = updateConfidenceCalibrationState(state, {
      conceptKey: "lesson_11::Array",
      lessonId: "lesson_11",
      conceptName: "Array",
      confidence: 4,
      correct: true,
      timestamp: 1_700_000_100_000,
    });

    expect(result.stats).toMatchObject({
      attempts: 2,
      correct: 1,
      overconfident: 1,
      calibrated: 1,
      accuracyPct: 50,
      avgConfidencePct: 90,
      calibrationGap: 40,
    });
    expect(result.state.log.map((entry) => entry.bucket)).toEqual(["calibrated", "overconfident"]);
  });
});
