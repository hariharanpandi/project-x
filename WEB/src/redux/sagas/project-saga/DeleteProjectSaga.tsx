import { takeLatest, call, put } from "redux-saga/effects";
import API from "../../axios"
import { endPoints } from "../../../api/EndPoints";
import { BASE_URL,BASE_PROJECT_URL } from "../../../api/ApiPath";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProjectDeleteResponse } from "../../@types/project-types/DeleteProjectTypes";
import { deleteProjectRequest,deleteProjectSuccess,deleteProjectFailure } from "../../slice/project-slice/DeleteProjectSlice";



export function* handleDeleteProject(action: {
  type: string;
  payload: { deleteId: string };
}) {
  const deleteId = action.payload;
  const userId = localStorage.getItem("userId")?.replace(/"/g, "");

  const token = localStorage.getItem("token");
  const authToken = token?.replace(/"/g, "");

  
 
 
  try {
    const response: ProjectDeleteResponse = yield call(API, {
      method: "DELETE",
      url: `${BASE_PROJECT_URL}${endPoints.account.project.delete}/${deleteId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
     
    });

    if (response) {
      const { data } = response;

      yield put(deleteProjectSuccess(data));
    }
  } catch (err: any) {
    yield put(deleteProjectFailure(err.response.data));
  }
}

export function* watchDeleteProjectSaga() {
  yield takeLatest(deleteProjectRequest.type, handleDeleteProject);
}