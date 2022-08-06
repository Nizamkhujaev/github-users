import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { githubAction } from "../store/github/github.slice";

const actions = {
    ...githubAction
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions,dispatch)
}