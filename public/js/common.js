let button = document.getElementById("submitPostButton");
let textarea = document.getElementById("postTextarea");

textarea.addEventListener("keyup", e => {
  let text = e.target.value.trim();
  if(text === "") {
    button.disabled = true;
    return;
  }

  button.disabled = false;
})

button.addEventListener("click", async () => {
  let content = textarea.value.trim();
  let data = {
    content
  }
  await fetch("/api/post", {
    method : "POST",
    body : data
  })

})
