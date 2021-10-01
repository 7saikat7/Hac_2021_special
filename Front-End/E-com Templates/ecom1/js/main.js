const inputs = document.querySelectorAll(".input");

/*add function*/

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}
/*cheeking*/

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

/*add*/
inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
