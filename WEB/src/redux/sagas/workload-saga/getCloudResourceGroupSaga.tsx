import API from "../../axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { BASE_WORKLOAD_URL } from "../../../api/ApiPath";
import { endPoints } from "../../../api/EndPoints"
import { AxiosResponse } from "axios";
import {
    getCloudResourceGroupSuccess,
    getCloudResourceGroupFailure,
    getCloudResourceGroupRequest,
} from "../../slice/workload-slice/getCloudResourceGroupSlice";

function* handleCloudResourceGroup({ payload }: { type: string; payload: Record<string, any> }) {

    const { queryparams } = payload;

    let url = `${BASE_WORKLOAD_URL}${endPoints.workload.cloudResourceGroup}`;

    if (queryparams && queryparams !== '') {
        url += `?${queryparams}`;
    }

    const authToken = localStorage.getItem("token")?.replace(/"/g, "") || "";

    try {
        const response: AxiosResponse<string> = yield call(API, {
            method: "GET",
            url,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response) {
            yield put(getCloudResourceGroupSuccess(response.data));
        }
    } catch (error: any) {
        console.log('Error occurred in CloudResourceGroupSaga', error?.message);
        yield put(getCloudResourceGroupFailure(error?.message));
    }
}

export function* watchHandleCloudResourceGroup() {
    yield takeLatest(getCloudResourceGroupRequest.type, handleCloudResourceGroup);
}