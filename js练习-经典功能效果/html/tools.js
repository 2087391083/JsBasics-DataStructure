
//返回当前元素在父元素中是第几个
Object.prototype.curParentIndex = function () {
    for (var i = 0; i < this.parentNode.children.length; i++) {
        if (this == this.parentNode.children[i]) {
            return i;
        }
    }
}

//创建节点
function CreateNode(newNodeName, newNodeValue, newNodeAppend) {
    var newCreateNodeName;
    if (newNodeName == "td") {
        newCreateNodeName = document.createElement(newNodeName);
        newCreateNodeName.contentEditable = "false";
        newCreateNodeName.innerHTML = newNodeValue;
        newNodeAppend.appendChild(newCreateNodeName);
    } else if (newNodeName == "img") {
        newCreateNodeName = document.createElement(newNodeName);
        newCreateNodeName.src = newNodeValue;
        newNodeAppend.appendChild(newCreateNodeName);
    } else if (newNodeName == "div") {
        newCreateNodeName = document.createElement(newNodeName);
        newCreateNodeName.innerHTML = newNodeValue;
        newNodeAppend.appendChild(newCreateNodeName);
    } else if (newNodeName == "hr") {
        newCreateNodeName = document.createElement(newNodeName);
        newNodeAppend.appendChild(newCreateNodeName);
    } else if (newNodeName == "h3" || newNodeName == "span") {
        newCreateNodeName = document.createElement(newNodeName);
        newCreateNodeName.innerHTML = newNodeValue;
        newNodeAppend.appendChild(newCreateNodeName);
    } else if (newNodeName == "ul") {
        newCreateNodeName = document.createElement(newNodeName);
        newNodeAppend.appendChild(newCreateNodeName);
    } else if (newNodeName == "li") {
        newCreateNodeName = document.createElement(newNodeName);
        newCreateNodeName.innerHTML = newNodeValue;
        newNodeAppend.appendChild(newCreateNodeName);
    }
    return newCreateNodeName;
}