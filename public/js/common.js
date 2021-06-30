let button = document.getElementById("submitPostButton");
let textarea = document.getElementById("postTextarea");
let posts = document.getElementById("postsContainer");

textarea.addEventListener("keyup", (e) => {
  let text = e.target.value.trim();
  if (text === "") {
    button.disabled = true;
    return;
  }

  button.disabled = false;
});

button.addEventListener("click", async () => {
  let content = textarea.value.trim();
  try {
    let rawResponse = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    let data = await rawResponse.json();
    let html = createPostHtml(data);
    posts.prepend(html);
  } catch (error) {
    console.log(error)
  }

});

function createPostHtml(post) {
  return post.content;
}