self.addEventListener('DOMContentLoaded', function () {
    const version = "0.1.2";

    function LoadTheme() {
        if (document.getElementById('sounddarkInjected') == null && localStorage.getItem("SoundDark_dismissDark") !== "yes") {
            let head = document.getElementsByTagName('head')[0],
                link = document.createElement('link');

            link.id = 'sounddarkInjected';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = chrome.runtime.getURL('sounddark.css');
            link.media = 'all';

            head.appendChild(link);
        }
    }

    LoadTheme();


    function ToggleTheme() {
        if (localStorage.getItem("SoundDark_dismissDark") === "yes") {
            localStorage.removeItem("SoundDark_dismissDark");
            LoadTheme();
        } else {
            localStorage.setItem("SoundDark_dismissDark", "yes");
            if (document.getElementById('sounddarkInjected') !== null) {
                document.getElementById('sounddarkInjected').remove();
            }
        }
    }

    self.addEventListener('load', function () {
        document.querySelector(".header__moreButton").addEventListener('click', function () {
            const targetMenu = document.querySelector(".headerMenu.moreMenu");
            const SDMenu = document.getElementById("SoundDarkMenu");

            if (targetMenu && !SDMenu) {
                targetMenu.innerHTML += `<ul id="SoundDarkMenu" class="headerMenu__list sc-list-nostyle">
                <small style="padding: 0.5rem;color:gray;font-weight: normal;font-size:9px">SoundDark v${version} by <a target="_blank" href="https://github.com/michioxd">michioxd</a></small>
            <li><a class="headerMenu__link moreMenu__link" target="_blank" href="https://github.com/michioxd/sounddark">SoundDark GitHub</a></li>
            <li><a style="cursor:pointer" id="SoundDarkMenu_ToggleThemeButton" class="headerMenu__link moreMenu__link">Toggle Theme</a></li>
            </ul>`;
                document.getElementById("SoundDarkMenu_ToggleThemeButton").addEventListener('click', ToggleTheme);
            }
        });
    });
});

