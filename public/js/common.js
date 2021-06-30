document.getElementById("postTextarea").addEventListener("keyup", e => {
  let text = e.target.value.trim();
  let button = document.getElementById("submitPostButton");
  if(text === "") {
    button.disabled = true;
    return;
  }

  button.disabled = false;
})

