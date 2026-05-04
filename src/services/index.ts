// Central service exports
export { authService } from './auth.service';
export { userService } from './user.service';
export { workerService } from './worker.service';
export { employerService } from './employer.service';
export { jobService, applicationService, skillService, type Job, type Application, type Skill } from './job.service';
export { paymentService } from './payment.service';
export { reviewService } from './review.service';
export { messageService } from './message.service';
export { adminService } from './admin.service';
export { analyticsService, type AnalyticsOverview, type RevenueData, type WorkerRanking, type SkillAnalytics } from './analytics.service';
export { websocketService } from './websocket.service';
export { locationService, type Location, type NearbyJob, type NearbyWorker, type JobMatch } from './location.service';
export { uploadService } from './upload.service';
export { 
  escrowService, 
  disputeService, 
  bulkService, 
  mlService,
  type Escrow, type EscrowHoldRequest, type EscrowReleaseRequest, type EscrowRefundRequest,
  type Dispute, type CreateDisputeRequest, type RespondDisputeRequest,
  type BulkUserImport, type BulkJobImport, type BulkExportRequest,
  type SkillRecommendation, type MarketTrend, type WorkerPricePrediction
} from './advanced.services';

// API instance for custom services
import axios from 'axios';
import { axiosClient } from '@lib/axios';

// Re-export axiosClient as 'api' for backward compatibility
export const api = axiosClient;
