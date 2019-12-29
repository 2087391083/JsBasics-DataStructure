
// 通过下标获取第几个子元素:从0开始
Object.prototype.indexSon=function(index) {
	return  this.children[index]
}

// 获取当前元素是父元素的第几个子元素:从0开始
Object.prototype.index=function() {
	var arr=this.parentElement.children
	for(var i=0;i<arr.length;i++){
		if(this==arr[i]){
			return i
		}
	}
}


