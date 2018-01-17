export function removeQueryParams(url){
	let arr = url.split("?");
	if(arr.length>0){
		return arr[0]
	}
	return url;
}

export function parseRouteMap(url){
	let arr = url.split("/");
	return {
		app:removeQueryParams(arr[2]),
		module:removeQueryParams(arr[3])
	}
}


export function parseNodesByUrl(url){
    if(url.indexOf("?")>=0)
        url = url.substr(0,url.indexOf("?"))
    let routerArr = url.split("/")
    routerArr = routerArr.filter((item)=>{
        return item!="" && item!="apps" && item.length<20 //过滤是id的情况
    })
    return routerArr

}


export function parseAuthNodeByUrl(url){
    let putProcessList = ["account.profile","account.userRole.authorize"] //修改处理列表节点
    if(url.indexOf("?")>=0)
        url = url.substr(0,url.indexOf("?"))
    let routerArr = url.split("/")
    routerArr = routerArr.filter((item)=>{
        return item!="" && item!="apps" && item.length<20 //过滤是id的情况
    })
    let authNode = routerArr.join(".");
    if(authNode.indexOf("add")>=0){
        authNode = authNode.replace("add","post")
    }
    else if(authNode.indexOf("edit")>=0){
        authNode = authNode.replace("edit","put")
    }
    else if(authNode.indexOf("export")>=0){
        //导出默认用export验证
    }
    else if(putProcessList.indexOf(authNode)>=0){
        authNode = authNode+".put"
    }
    else
       authNode = authNode+".get"
   return authNode
}