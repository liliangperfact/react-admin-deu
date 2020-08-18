import {
  reqGetSubject,
  reqGetSecSubject,
  reqDelSubject
} from "@api/edu/subject";
import { message, } from 'antd'
import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  DEL_SUBJECT_LIST
} from "./constants";
/**
 * 获取/一级
 */
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      message.success('更新课程成功');
      return response.total;
    });
  };
};

/**
 * 获取/二级
 */
const getSecSubjectListSync = list => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = (parentId) => {

  return (dispatch) => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response.total;
    });
  };
};


//删除
const delSubjectListSync = id => ({
  type: DEL_SUBJECT_LIST,
  data: id,
});

export const delOneSubject = (id) => {
  return (dispatch) => {
    return reqDelSubject(id).then(() => {
      dispatch(delSubjectListSync(id));
      message.success('删除课程成功');
    });
  };
};

