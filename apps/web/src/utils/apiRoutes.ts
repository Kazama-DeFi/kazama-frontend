// HOST
export const host = "https://api.kazama.io";

// CONNECT
export const connect = `${host}/api/auth/connect`;

// ROUTES
export const sendMessageRoute = `${host}/api/message/addmsg`;
export const getAllMessagesRoute = `${host}/api/message/getmsg`;

// POST
export const addNotification = `${host}/api/auth/add_notification`;
export const addToBlocklist = `${host}/api/auth/add_blocklist`;
export const addMessageLike = `${host}/api/message/likemsg`;
export const createRain = `${host}/api/rain/create_rain`;
export const claimRain = `${host}/api/rain/claim_rain`;
export const followUser = `${host}/api/auth/follow_user`;
export const deleteNotification = `${host}/api/auth/delete_notification`
export const deleteAllNotifications = `${host}/api/auth/delete_all_notifications`
export const likeMessage = `${host}/api/auth/like_message`;
export const loginSession = `${host}/api/auth/login_session`;
export const unfollowUser = `${host}/api/auth/unfollow_user`;
export const markNotificationAsRead = `${host}/api/auth/mark_notification`
export const markAllNotificationsAsRead = `${host}/api/auth/mark_all_notifications`
export const removeFromBlocklist = `${host}/api/auth/remove_blocklist`;
export const postWall = `${host}/api/auth/post_wall`;
export const getUser = `${host}/api/auth/get_user`;
export const setRole = `${host}/api/auth/set_role`;
export const setIsActivated = `${host}/api/auth/set_activated`;
export const setIsOnline = `${host}/api/auth/set_online`;
export const setBalance = `${host}/api/auth/set_balance`;
export const setXp = `${host}/api/auth/set_xp`;
export const setResetProgress = `${host}/api/auth/set_reset_progress`;
export const setRankProgress = `${host}/api/auth/set_rank_progress`;
export const setPassword = `${host}/api/auth/set_password`;
export const setNewPassword = `${host}/api/auth/set_new_password`;
export const setRank = `${host}/api/auth/set_rank`;
export const setIp = `${host}/api/auth/set_ip`;
export const setCountry = `${host}/api/auth/set_country`;
export const setWarnings = `${host}/api/auth/set_warning`;
export const setMuted = `${host}/api/auth/set_muted`;
export const setBanned = `${host}/api/auth/set_banned`;
export const isValidName = `${host}/api/auth/valid_name`;
export const setAvatar = `${host}/api/auth/set_avatar`;
export const setSpacenaut = `${host}/api/auth/set_spacenaut`;
export const setKraken = `${host}/api/auth/set_kraken`;
export const setWhale = `${host}/api/auth/set_whale`;
export const setShark = `${host}/api/auth/set_shark`;
export const setOrca = `${host}/api/auth/set_orca`;
export const setDolphin = `${host}/api/auth/set_dolphin`;
export const setTurtle = `${host}/api/auth/set_turtle`;
export const setFish = `${host}/api/auth/set_fish`;
export const setCrab = `${host}/api/auth/set_crab`;
export const setShrimp = `${host}/api/auth/set_shrimp`;
export const setHolder = `${host}/api/auth/set_holder`;
export const setLiquidityProvider = `${host}/api/auth/set_liquidity_provider`;
export const setUsername = `${host}/api/auth/set_username`;
export const tipUser = `${host}/api/auth/tip_user`

// GET
export const checkUsername = `${host}/api/auth/check_username`;
export const getActivated = `${host}/api/auth/activated`;
export const getAllUsers = `${host}/api/auth/all_users`;
export const getAvatar = `${host}/api/auth/avatar`;
export const getBalance = `${host}/api/auth/platform_balance`
export const blocklist = `${host}/api/auth/blocklist`;
export const getMessageWall = `${host}/api/auth/message_wall`;
export const getKazamaBalance = `${host}/api/auth/kazama_balance`;
export const getNotifications = `${host}/api/auth/notifications`;
export const getRainData = `${host}/api/rain/rain_data`;
export const getUsersList = `${host}/api/auth/users_list`;
export const getUserInfo = `${host}/api/auth/user_info`;
export const getUserData = `${host}/api/auth/get_user_data`;
export const getUserRankData = `${host}/api/auth/rank_data`;
export const logOut = `${host}/api/auth/logout`;
export const getOnline = `${host}/api/auth/online`;
export const getTotalFollowers = `${host}/api/auth/total_followers`
export const getTotalUsers = `${host}/api/auth/total_users`;
export const getUsername = `${host}/api/auth/username`;
export const getRole = `${host}/api/auth/role`;
export const getWarnings = `${host}/api/auth/warnings`;
export const getCrashData = `${host}/api/auth/crash_data`;
export const getNewestAccount = `${host}/api/auth/newest_account`;