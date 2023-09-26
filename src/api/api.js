import requests from "./requests.js";
export default {
    getProblemList:(params) =>{
        return requests({
            url:"/problem-list",
            method:"get",
            params:params
        })
    },
    getSubmitList:(params) =>{
        return requests({
            url:"/submit-list",
            method:"get",
            params:params
        })
    },
    getProblemDetail:(params) =>{
        return requests({
            url:"/problem-detail",
            method:"get",
            params:params,
        })
    },
    getCategoriesList:(params) =>{
        return requests({
            url:"/category-list",
            method:"get",
            params:params
        })
    },
    getRankList:(params) =>{
        return requests({
            url:"/rank-list",
            method:"get",
            params:params
        })
    },
    sendCode:(params) =>{
        return requests({
            url:"/send-code",
            method:"post",
            data:params,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    },
    Register:(params) =>{
        return requests({
            url:"/register",
            method:"post",
            data:params,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    },
    Login:(params) =>{
        return requests({
            url:"/login",
            method:"post",
            data:params,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    },
    submit:(params,body) =>{
        return requests({
            url:"/user/submit",
            method:"post",
            headers:{
                "Authorization": localStorage.getItem("token"),
            },
            data:body,
            params:params,
        })
    },
    getUserDetail:(params) =>{
        return requests({
            url:"/user-detail",
            method:"get",
            params:params,
        })
    },
    DeleteCategory:(params) =>{
        return requests({
            url:"/admin/category-delete",
            method:"delete",
            headers:{
                "Authorization": localStorage.getItem("token"),
            },
            params:params,
        })
    },
    AddCategory:(params) =>{
        return requests({
            url:"/admin/category-create",
            method:"post",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            data:params,
        })
    },
    AddProblem:(params) =>{
        return requests({
            url:"/admin/problem-create",
            method:"post",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            data:params,
        })
    },
    DeleteProblem:(params) =>{
        return requests({
            url:"/admin/problem-delete",
            method:"post",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "content-type": "multipart/form-data",
            },
            data:params,
        })
    },
    UpdateProblem:(params) =>{
        return requests({
            url:"/admin/problem-update",
            method:"put",
            headers:{
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            data:params,
        })
    }
}