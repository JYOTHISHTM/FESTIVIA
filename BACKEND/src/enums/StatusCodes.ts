export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Messages {
  INTERNAL_SERVER_ERROR = "Internal server error",
  CREATOR_NOT_FOUND = "Creator not found",
  USER_NOT_FOUND = "User not found",
  REAPPLIED_SUCCESSFULLY = "Reapplied successfully",
  FETCH_SUBSCRIPTION_ERROR = "Error fetching subscription plan",
  FETCH_PENDING_CREATORS_ERROR = "Error fetching pending creators",
  ERROR_FETCHING_SUBSCRIPTION_PLAN = 'Error fetching subscription plan',
  SUBSCRIPTION_DELETED_SUCCESSFULLY = 'Subscription deleted successfully',
  FAILED_TO_DELETE_SUBSCRIPTION = 'Failed to delete subscription',
  MISSING_REQUIRED_FIELDS = 'Missing required fields',
  CREATOR_APPROVED_SUCCESSFULLY = 'Creator approved successfully',
  ERROR_APPROVING_CREATOR = 'Error approving creator',
  REJECTION_REASON_IS_REQUIRED = 'Rejection reason is required',
  ERROR_REJECTING_CREATOR = 'Error rejecting creator',
  ERROR_REJECTING_USERS = 'Error rejecting users',
  ERROR_FETCHING_CREATOR_STATUS = 'Error fetching creator status',
  LOGIN_SUCCESSFUL = 'Login successful',
  LOGGED_OUT_SUCCESSFULLY = 'Logged out successfully',
  USER_BLOCKED_SUCCESSFULLY = 'User blocked successfully',
  USER_UNBLOCKED_SUCCESSFULLY = 'User unblocked successfully',
  CREATOR_UNBLOCKED_SUCCESSFULLY = 'Creator unblocked successfully',
  CREATOR_BLOCKED_SUCCESSFULLY = 'Creator blocked successfully',
  ERROR_UPDATING_USER_STATUS = 'Error updating user status',
  ERROR_UPDATING_CREATOR_STATUS = 'Error updating creator status',
  ERROR_FETCHING_CREATORS = 'Error fetching creators',
  CREATOR_REJECTED_SUCCESSFULLY = 'Creator rejected successfully',
}


export enum AuthMessages {
  INVALID_CREDENTIALS = 'Invalid credentials',
  MISSING_AUTH_DATA = 'Authentication error',
  INVALID_ROLE = 'Invalid role',
  INVALID_USER_TYPE = 'Invalid user type',
  LOGOUT_SUCCESSFUL = 'Logout successful',
  NO_REFRESH_TOKEN = 'No refresh token provided',
  INVALID_OTP = 'Invalid OTP',
  OTP_VERIFIED_SUCCESSFULLY = 'OTP verified successfully',
  RESET_PASSWORD_SUCCESS = 'Password reset successfully',
  GOOGLE_AUTH_FAILED = 'Google authentication failed',
  INVALID_REQUEST_DATA = 'Invalid request data',
  INTERNAL_SERVER_ERROR = "Internal server error",

}



export enum ChatMessages {
  FAILED_TO_FETCH_MESSAGES = 'Failed to fetch messages',
  FAILED_TO_FETCH_CHATS = 'Failed to fetch chats',
  FAILED_TO_FETCH_USER_CHATS = 'Failed to fetch user chats',
  FAILED_TO_INITIATE_CHAT = 'Failed to initiate chat',
  MISSING_USER_OR_CREATOR_ID = 'Both userId and creatorId are required',
  SERVER_ERROR = 'Server error',
}


export enum CreatorMessages {
  MISSING_CREATOR_ID = 'Missing creatorId',
  FAILED_TO_FETCH_EVENTS = 'Failed to fetch events',
  UNAUTHORIZED_CREATOR = 'Unauthorized: Creator ID not found',
  IMAGE_REQUIRED = 'Image file is required.',
  INVALID_GEOLOCATION_FORMAT = 'Invalid geoLocation format',
  INVALID_GEOLOCATION_JSON = 'Invalid geoLocation JSON',
  REQUIRED_FIELDS_MISSING = 'All required fields must be provided',
  INVALID_PRICE = 'Price is required and must be a valid number for GENERAL seat type',
  DATE_REQUIRED_FOR_SINGLE = 'Date is required for single day mode',
  RANGE_DATES_REQUIRED = 'Start and end dates are required for range mode',
  INVALID_LAYOUT_ID = 'Invalid layout ID',
  SEAT_LAYOUT_NOT_FOUND = 'Seat layout not found',
  LAYOUT_ALREADY_USED = 'This layout is already used by another event',
  FAILED_TO_CREATE_EVENT = 'Failed to create event',
  UNAUTHORIZED = 'Unauthorized',
  CREATOR_NOT_FOUND = 'Creator not found',
  SERVER_ERROR = 'Server Error'
}



export enum EventMessages {
  ERROR_FETCHING_HOME_EVENTS = 'Error fetching home events',
  MISSING_CREATOR_ID = 'Missing creator id',
  ERROR_FETCHING_EVENTS = 'Error fetching events',
  EVENT_NOT_FOUND = 'Event not found',
  ERROR_FETCHING_EVENT = 'An error occurred while fetching the event.',
  FAILED_TO_FETCH_EVENTS = 'Failed to fetch events',
  FAILED_TO_FETCH_EVENT_TYPES = 'Failed to fetch event types',
  LISTING_STATUS_UPDATED = 'Listing status updated',
  FAILED_TO_UPDATE_LISTING_STATUS = 'Failed to fetch update event status list/unlist',
  STRIPE_ERROR = 'Stripe Error',
  FAILED_TO_UPDATE_DESCRIPTION = 'Failed to update description',
  NO_LOCATION = 'no_location',
  NO_EVENTS = 'no_events'
}


export enum PostEventMessages {
  MAIN_IMAGE_REQUIRED = "Main image is required.",
  EVENT_CREATION_FAILED = "Event creation failed.",
  EVENT_CREATED_SUCCESSFULLY = "Event created successfully",
  EVENT_NOT_FOUND = "Event not found",
  ERROR_FETCHING_EVENT_DETAILS = "Something went wrong",
  MISSING_CREATOR_ID = "Missing creatorId",
  ERROR_FETCHING_EVENTS = "Failed to fetch events.",
  ERROR_GETTING_PROFILE_INFO = "Failed to get profile info",
  MISSING_IMAGE_OR_ID = "Missing image or creator ID",
  FAILED_TO_UPDATE_PROFILE_IMAGE = "Failed to update profile image",
  INVALID_PROFILE_UPDATE_DATA = "Invalid data",
  FAILED_TO_UPDATE_PROFILE_INFO = "Failed to update profile info",
  PROFILE_NOT_FOUND = "Profile not found",
  CREATOR_ID_REQUIRED = "Creator ID is required",
}


export enum ProfileMessages {
  PROFILE_ID_NOT_FOUND = 'Profile ID not found',
  USER_NOT_FOUND = 'user not found',
  CREATOR_NOT_FOUND = 'creator not found',
  SERVER_ERROR = 'Server Error',
  UNAUTHORIZED = 'Unauthorized',
  ERROR_FETCHING_PROFILE = 'Error fetching profile',
}


export enum SeatLayoutMessages {
  CREATOR_ID_REQUIRED = 'creatorId is required in URL params',
  LAYOUT_TYPE_AND_SEATS_REQUIRED = 'layoutType and totalSeats are required in body',
  PRICE_MUST_BE_NUMBER = 'price must be a number for this layoutType',
  BALCONY_PRICE_REQUIRED = 'price with normal and premium numbers is required',
  RECLANAR_PRICE_REQUIRED = 'price with reclanar and reclanarPlus numbers is required',
  INVALID_LAYOUT_TYPE = 'Invalid layoutType',
  FAILED_TO_SAVE_LAYOUT = 'Failed to save layout',
  FAILED_TO_RETRIEVE_LAYOUTS = 'Failed to retrieve layouts',
}


export enum SubscriptionMessages {
  STRIPE_CHECKOUT_ERROR = 'Stripe Checkout Error',
  SUBSCRIPTION_PURCHASED = 'Subscription purchased using wallet',
  BUY_WALLET_ERROR = 'Buy wallet error',
  FETCH_SUBSCRIPTION_ERROR = 'Error fetching subscription',
  FETCH_SUBSCRIPTION_PLANS_ERROR = 'Error fetching subscription plans',
  CREATOR_ID_MISSING = 'Creator ID missing',
  FETCH_HISTORY_ERROR = 'Failed to fetch history.',
  SUBSCRIPTION_EXPIRED = 'Subscription marked as expired',
  EXPIRE_SUBSCRIPTION_ERROR = 'Expire subscription error',
}


export enum TicketMessages {
  INVALID_CREATOR_ID = 'Invalid or missing creatorId',
  SERVER_ERROR = 'Server error',
  CREATOR_ID_REQUIRED = 'creatorId is required',
  TICKET_SUMMARY_ERROR = 'Ticket Summary Error',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}


export enum UserMessages {
  USER_NOT_FOUND = 'User not found',
  SERVER_ERROR = 'Server Error',
  ERROR_FETCHING_TICKETS = 'Error fetching tickets',
  TICKET_CANCELLED = 'Ticket cancelled. ₹{amount} refunded to your wallet.',
  ERROR_CANCELLING_TICKET = 'Error cancelling ticket',
  ERROR_FETCHING_LAYOUT = 'Error fetching layout and event data',
}

export enum WalletMessages {
  BOOKING_SUCCESS = 'Booking successful',
  BOOKING_ERROR = 'Booking Error:',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  USER_ID_AND_AMOUNT_REQUIRED = 'User ID and amount are required.',
  CREATOR_ID_AND_AMOUNT_REQUIRED = 'creatorId  and amount are required.',
  USER_ID_REQUIRED = 'User ID is required.',
  CREATOR_ID_REQUIRED = 'creatorId is required.',
  WALLET_NOT_FOUND = 'Wallet not found.',
}











