import { RootState } from '@redux/configure-store';

export const isLogedSelect = (state: RootState) => state.auth.isLogged
export const desctopVersionSelect = (state: RootState) => state.app.desctopVersion;
export const emailSelect = (state: RootState) => state.auth.user.login;
export const jwtSelect = (state: RootState) => state.auth.jwt;
export const passwordSelect = (state: RootState) => state.auth.user.password;
export const confirmPasswordSelect = (state: RootState) => state.auth.user.confirmPassword;
export const selectedDateSelect = (state: RootState)  => state.traningList.selectedDate;
export const usersFeedbacks = (state: RootState) => state.feedBack.usersFedbacks;
export const feedbacksErrorSelect = (state: RootState) => state.feedBack.feedbacksError;
export const postFeedbakcSuccess = (state: RootState) => state.postFeedbakc.postFeedbakcSuccess;
export const postfeedbacksError = (state: RootState) => state.postFeedbakc.postfeedbacksError;
export const isPostfeeedbacksLogged = (state: RootState) =>state.postFeedbakc.isPostfeeedbacksLogged;
export const istraningListLoadSelect = (state: RootState) => state.traningList.isTraningListLoad;
export const errorModalSelect = (state: RootState) => state.treningModals.isModalError;
export const isOpenModalSelect =  (state: RootState) => state.treningModals.isOpenModal
export const traningListErrorSelect  = (state: RootState) => state.traningList.traningListError;
export const userTraningListSelect  = (state: RootState) => state.traningList.userTraningList;
export const istraningCatalogsLoadSelect  = (state: RootState) => state.traningCatalogs.istraningCatalogsLoad;
export const traningCatalogsSelect  = (state: RootState) => state.traningCatalogs.traningCatalogs;
export const traningCatalogsErrorSelect  = (state: RootState) => state.traningCatalogs.traningCatalogsError;
export const calendarModalStatusSelect = (state: RootState) => state.treningModals.modalStatus;
export const selectedTraningSelect = (state: RootState) => state.traningList.selectedTraning;
export const prevDataSelect = (state: RootState) => state.treningModals.prevData;
export const updateErrorSelect = (state: RootState) => state.updateTrening.UpdateTraningError;
export const createErrorSelect = (state: RootState) => state.createTraning.error;
export const tarifSelect = (state: RootState) => state.tarif.tarifBody
export const myTreningsErrorSelect = (state: RootState) => state.myTrenings.isMyTreningsError
export const joinUsersSelect = (state: RootState) => state.joinTrening.joinUsers
export const joinUsersContentSelect = (state: RootState) => state.joinTrening.JoinUsersList
export const treningPartnersSelect = (state: RootState) => state.joinTrening.treningPartners
export const treningIdSelect = (state: RootState) => state.invate.createTreningId
export const userIdSelect = (state: RootState) => state.invate.userId
export const joinTeningRequestsSelect = (state: RootState) => state.joinTeningRequests.joinTeningRequests
export const showMypartnerSelect = (state: RootState) => state.sendRequest.showMyPartner
export const createMyTreningSuccsessSelect = (state: RootState) => state.createMyTrening.isCreateMyTreningSuccess
export const updateMyTreningSuccsessSelect = (state: RootState) => state.updateMyTrening.isUpdateMyTreningSuccess
export const updateMyTreningErrorSelect = (state: RootState) => state.updateMyTrening.isUpdateMyTreningError
export const createMyTreningErrorSelect = (state: RootState) => state.createMyTrening.isCreateMyTreningError
export const treningUserTypeSelect = (state: RootState) => state.joinTrening.treningType
export const fetJoinUsersErrorSelect = (state: RootState) => state.joinTrening.isJoinsersError
export const postInviteErrorSelect = (state: RootState) => state.invate.isInvateError
export const createTraningLoad = (state: RootState) => state.createTraning.isLoad
export const updateTraningLoad = (state: RootState) => state.updateTrening.isUpdateTraningLoad
export const getMytreningsLoadSelect = (state: RootState) => state.myTrenings.isMyTreningsLoad
export const getJointreningsLoadSelect = (state: RootState) => state.joinTrening.isJoinTreningLoad
export const getAchivmetnLoadSelect = (state: RootState) => state.achievement.getAchievementTreningLoad
export const getfeedbackLoadSelect = (state: RootState) => state.feedBack.isfeeedbacksLogged


