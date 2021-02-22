const githubURL = 'https://api.github.com';
const githubUser = 'juan-patrick';

const API = {
  async getUser() {
    const response = await fetch(`${githubURL}/users/${githubUser}`);
    const user = await response.json();

    return user;
  },
  async getFollowers() {
    const response = await fetch(`${githubURL}/users/${githubUser}/followers`);
    const followers = await response.json();

    return followers;
  },
};

const DOM = {
  profileContainer: document.querySelector('#profile'),
  followersContainer: document.querySelector('#followers'),
  addFollower(follower) {
    const followerDiv = document.createElement('div');

    followerDiv.classList.add('flex', 'items-center', 'justify-center', 'flex-col', 'my-2');
    followerDiv.innerHTML = DOM.innerHTMLFollower(follower);

    DOM.followersContainer.appendChild(followerDiv);
  },
  addProfileAvatar(user) {
    DOM.profileContainer.innerHTML = DOM.innerHTMLProfile(user);
  },
  innerHTMLProfile(user) {
    const html = `<img class="w-11 h-9 object-cover rounded-full border-2 border-pink-700" src="${user.avatar_url}" alt="profile" />`;

    return html;
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
  },
}


const App = {
  async init() {
    API.getUser().then(DOM.addProfileAvatar);

    for (let i = 0; i < 20; i++) {
      DOM.addAvatarSkeleton();
    };

    setTimeout(async () => {
      App.reset();
      API.getFollowers().then(followers => {
        followers.forEach(DOM.addFollower)
      });
    }, 1000);
  },
  reset() {
    DOM.followersContainer.innerHTML = '';
  }
}

App.init();