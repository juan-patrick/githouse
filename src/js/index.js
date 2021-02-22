const githubURL = 'https://api.github.com';
const githubUser = 'juan-patrick';

const API = {
  async getFollowers() {
    const response = await fetch(`${githubURL}/users/${githubUser}/followers`);
    const followers = await response.json();

    return followers;
  },
};

const DOM = {
  followersContainer: document.querySelector('#followers'),
  addFollower(follower) {
    const followerDiv = document.createElement('div');

    followerDiv.classList.add('flex', 'items-center', 'justify-center', 'flex-col', 'my-2');
    followerDiv.innerHTML = DOM.innerHTMLFollower(follower);

    DOM.followersContainer.appendChild(followerDiv);
  },
  innerHTMLFollower(follower) {
    const html = `    
      <img class="avatar w-20 h-20 object-cover rounded-full border-pink-700"
        src="${follower.avatar_url}"
        alt="avatar-${follower.login}" />
      <p class="text-md font-extrabold mt-1 text-center">
        ${follower.login}
      </p>`;

    return html;
  },
  innerHTMLAvatarSkeleton() {
    const html = `<div class="avatar w-20 h-20 object-cover rounded-full bg-gray-400"></div>`;

    return html;
  },
  addAvatarSkeleton() {
    const skeletonDiv = document.createElement('div');

    skeletonDiv.classList.add('animate-pulse', 'flex', 'items-center', 'justify-center', 'space-x-4', 'my-2', 'mt-3');
    skeletonDiv.innerHTML = DOM.innerHTMLAvatarSkeleton();

    DOM.followersContainer.appendChild(skeletonDiv);
  }
}


const App = {
  async init() {
    for (let i = 0; i < 20; i++) {
      DOM.addAvatarSkeleton();
    };

    setTimeout(async () => {
      const followers = await API.getFollowers();
      App.reset();
      followers.forEach(DOM.addFollower);
    }, 1000);
  },
  reset() {
    DOM.followersContainer.innerHTML = '';
  }
}

App.init();