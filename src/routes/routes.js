import express from 'express';
import { testResultAnalyserController } from "../controllers/testResultAnalyserController.js";
import {testDescriptionGeneratorController} from "../controllers/testDescriptionGeneratorController.js";
import {testGenerationController} from "../controllers/testGenerationPreparationController.js";
import {errorMessageAnalyserController} from "../controllers/errorMessageAnalyserController.js";

const router = express.Router();

router.post('/test-result/analyse', testResultAnalyserController);
router.post('/test-error/analyse', errorMessageAnalyserController);
router.post('/test-description/generate', testDescriptionGeneratorController);
router.post('/test-generation/generate', testGenerationController);
export default router;