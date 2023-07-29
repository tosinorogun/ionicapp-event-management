/* eslint-disable @typescript-eslint/naming-convention */
export class ApiCredentials {
  public static readonly APP_ID = '97627';
  public static readonly APP_KEY = 'C8762BA5675574D3F0D6344DBAE33A66';
  public static readonly APP_SECRET = '4CB4768206F76B95FC2B1AE6A194F42D';
  public static readonly APP_SESSION = 'svjdf943r9y45nf94hr04fn083hng9h30';
  public static readonly ZOOM_KEY = 'Eon2Tj0VvAdaSQ1dUz3zy6PGcW1VqCvf5RNS';
  public static readonly ZOOM_SECRET = 'HFAQVrieL9LcqHxWu3trK8GBHlAjXxqW8eKD';

  // public static readonly ZOOM = 'svjdf943r9y45nf94hr04fn083hng9h30';
  // eslint-disable-next-line max-len
  public static readonly STRIPE_PUBLISHABLE_TEST = 'pk_test_51IFll6EEPyEsTkBVr6Yd61ZVOMl7JWcomuidzx8ufAZGWAaSy1YR2cVSDhQN7U2fIy9MPqQEuEX7TZ919p6oaJ8000Rn3N9S72';
}

export class ApiEndpoint {
  // Authentication
  public static readonly AUTH_TOUR = 'auth/tour/';
  public static readonly AUTH_LOGIN = 'auth/login/';
  public static readonly AUTH_SIGNUP = 'auth/signup/';
  public static readonly AUTH_ACTIVATE = 'auth/activate/';
  public static readonly AUTH_FORGOT_PASSWORD = 'auth/forgot-password/';
  public static readonly AUTH_ACCOUNT_DETAIL = 'auth/account-detail/';
  public static readonly AUTH_RESEND_ACTIVATION = 'auth/resend-activation/';
  public static readonly AUTH_RESET_PASSWORD = 'auth/reset-password/';
  public static readonly AUTH_UPDATE_ACCOUNT = 'auth/update-account/';
  public static readonly AUTH_UPDATE_PHOTO = 'auth/update-photo/';
  public static readonly AUTH_UPDATE_PASSWORD = 'auth/update-password/';
  public static readonly AUTH_UPDATE_NOTIFICATION = 'auth/update-notification/';
  public static readonly AUTH_LOGOUT = 'auth/logout/';
  public static readonly AUTH_CLOSE = 'auth/close-account/';
  // public static readonly QRCODE = 'auth/qrcodes/';

  // Public Endpoints
  public static readonly HOME = 'home/';
  public static readonly PAGES = 'pages/page-detail/';
  public static readonly FAQS = 'pages/faqs/';
  public static readonly ORGANIZATIONS = 'jobsapp/organizations/';
  public static readonly CERTIFICATIONS = 'jobsapp/certifications/';
  public static readonly DEGREES = 'jobsapp/degrees/';
  public static readonly COUNTRIES = 'jobsapp/countries/';

  public static readonly DASHBOARD = 'main/dashboard/';
  public static readonly JOB_LIST = 'jobsapp/job-list/';
  public static readonly JOB_DETAIL = 'jobsapp/job-detail/';
  public static readonly JOB_APPLY = 'jobsapp/job-application/';
  public static readonly SCAN_QRCODE = 'main/scan-qrcode/';
  public static readonly LOG_SCAN_ENTRY = 'main/log-scan-entry/';
  public static readonly ARRIVED_GUEST = 'main/arrived-guest/';

  public static readonly SHIFT_ENTRY = 'jobsapp/shift_log/';
  public static readonly ADMIN_MESSAGE = 'jobsapp/admin-messages/';
  public static readonly ADMIN_MESSAGE_DETAIL = 'jobsapp/admin-message-detail/';
  public static readonly RESUME_SUMMARY = 'jobsapp/resume-summary/';
  public static readonly RESUME_ADD_ACADEMIC = 'jobsapp/resume-add-academic/';
  public static readonly RESUME_ADD_CERT = 'jobsapp/resume-add-cert/';
  public static readonly RESUME_ADD_EMPLOYMENT = 'jobsapp/resume-add-employment/';
  public static readonly RESUME_ADD_COVER = 'jobsapp/resume-add-cover/';
  public static readonly RESUME_UPDATE_ACADEMIC = 'jobsapp/resume-update-academic/';
  public static readonly RESUME_UPDATE_EMPLOYMENT = 'jobsapp/resume-update-employment/';
  public static readonly RESUME_UPDATE_COVER = 'jobsapp/resume-update-cover/';
  public static readonly RESUME_DETAIL_EMPLOYMENT = 'jobsapp/resume-detail-employment/';
  public static readonly RESUME_DETAIL_ACADEMIC = 'jobsapp/resume-detail-academic/';
  public static readonly RESUME_DETAIL_COVER = 'jobsapp/resume-detail-cover/';
  public static readonly RESUME_DELETE_CERT = 'jobsapp/resume-update-cert/';
  public static readonly RESUME_DELETE_EMPLOYMENT = 'jobsapp/resume-delete-employment/';
  public static readonly RESUME_DELETE_ACADEMIC = 'jobsapp/resume-delete-academic/';
  public static readonly DOWNLOAD_RESUME = 'jobsapp/my-resume-download/';
  public static readonly DOWNLOAD_COVER_LETTER = 'jobsapp/my-resume-cover-download/';
  public static readonly INCOME_LIST = 'jobsapp/income-list/';
  public static readonly INCOME_DETAIL = 'jobsapp/income-detail/';
  public static readonly STRIPE_CREATE_ACCOUNT = 'jobsapp/stripe-account-create/';
  public static readonly STRIPE_GET_ACCOUNT = 'jobsapp/stripe-account-get/';
  public static readonly STRIPE_LINK = 'jobsapp/stripe-account-link/';
  public static readonly STRIPE_LOGIN_LINK = 'jobsapp/stripe-account-login-link/';
  public static readonly STRIPE_GET_BALANCE = 'jobsapp/stripe-instant-payout-balance/';
  public static readonly STRIPE_INSTANT_PAYOUT = 'jobsapp/stripe-instant-payout-create/';
  public static readonly CONNECT_ROOMS = 'jobsapp/connect-rooms/';
  public static readonly CONNECT_STREAM = 'jobsapp/connect-stream/';
  public static readonly CONNECT_CHAT = 'jobsapp/connect-chat/';
  public static readonly ARCHIVE_CHAT = 'jobsapp/connect-archive-chat/';

  // Local Storage Database
  public static readonly LOCAL_USERDATA = 'userdata';
  public static readonly LOCAL_TOUR = 'tourdata';
  public static readonly LOCAL_TEMP = 'tempdata';
  public static readonly CHAT_DATA = 'chatdata';

  // Other Global Variables
  public static readonly VALIDATE_EMAIL = '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})';
}

export class SliderOptions {
  public static readonly COURSE_SLIDER_OPTION = {
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 5
      },
      375: {
        slidesPerView: 2.2,
        slidesPerGroup: 2.2,
        spaceBetween: 6
      },
      480: {
        slidesPerView: 2.5,
        slidesPerGroup: 2.5,
        spaceBetween: 6
      },
      568: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 8
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 10
      },
      1366: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 14
      }
    }
  };

  public static readonly BANNER_SLIDER_OPTION = {
    autoplay:true,
    slidesPerView: 1,
    initialSlide: 0,
    speed: 800,
  };

}

export class MessageHandler {
  public static readonly MSG = {
    login: {
      header: 'Login Error!',
      message: 'Sorry! A problem occured while attempting to log you in.',
      option: {
        cancel: 'Ok! Dismiss',
        action: '',
      }
    },
    signup: {
      header: 'Signup Error!',
      message: 'Sorry! A problem occured while attempting to register your account.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    },
    activate: {
      header: 'Signup Error!',
      message: 'Sorry! A problem occured while activating your account.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    },
    resendActivation: {
      header: 'Code Resend Error!',
      message: 'Sorry! A problem occured while resending activation code.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    },
    forgotPassword: {
      header: 'Forgot Password Error!',
      message: 'Sorry! A problem occured while attempting to retrieve your old password.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    },
    resetPassword: {
      header: 'Password Reset Error!',
      message: 'Sorry! A problem occured while attempting to reset your password.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    },
    addItem: {
      header: 'Error adding item!',
      message: 'Sorry! A problem occured while attempting to add new item.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    },
    updateItem: {
      header: 'Error updating item!',
      message: 'Sorry! A problem occured while attempting to add new item.',
      option: {
        cancel: 'Try Again',
        action: '',
      }
    }
  };
}
