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