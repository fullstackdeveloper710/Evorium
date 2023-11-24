// API Doc link - http://api.evorium.xyz/api-docs/

// figma link - https://www.figma.com/file/8xmy7Eb5mlewMeFKxNO1tV/Evorium-website?type=design&node-id=0-1&mode=design

// Base_URL
// export const url = 'http://192.168.1.115:8080'; // staging url
export const url = 'https://api.evorium.xyz'; // produnction url

// All Api name
export const API_LOGIN = '/user/login';
export const API_USERSIGNUP = '/user/signup';
export const API_VerifyNumber = '/user/verify_mobile_number';
export const API_forgetPassword = '/forget_password';

export const API_Categories = '/tags?all=';
export const API_Home = '/user/programs?pageNo=1&pageSize=10&course_type=';
export const API_VideoViews = '/user/program_view_count';

export const API_RecentProgram = '/user/add_recent_program';
export const API_addRecentProgram = '/user/add_recent_program';
export const API_FacebookURL = '/user/login_facebook';
export const API_GoogleLoginURL = '/user/login_google';

export const API_Speaker_Category = '?all=true';
export const API_DeleteAccount = '/user/delete/';
export const API_ShowRecentProgram = '/user/fetch_recent_programs';

export const API_UpdateRecentProgram = '/user/update_recent_program';
export const API_RefreshToken = '/user/refresh_token';

export const API_MyUserAcc = '/user/my_account';
export const API_MyUpdate = '/user/update';
export const API_DownloadVideo = '/user/download_video';

export const API_RecommendedProgram = '/user/recommended_programs?category=';

// URL of payment api
export const API_Initilization = '/user/payment_intilization';
export const API_PaymentConfirm = '/user/payment_confirmation';
export const API_Filter = '/user/filter';
export const API_MyProgram = '/user/my_programs';
// facebook App secret key - 908f3476265c3aeafc9141775f56bf17
// facebook App id - 1083604836218636
// client token - d9a7a23f151f692547ed75c5091bd0d1
