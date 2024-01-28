/**
 * 
 * @name SoundDark
 * @description A Chromium extension to get better Dark theme for SoundCloud
 * @version 0.1.8.1
 * @license https://github.com/michioxd/sounddark/blob/main/LICENSE
 * @author michioxd
 * 
 */

function getBrowserPlatform() {
    if (window.chrome || window.webview) {
        return 1;
    } else if (typeof InstallTrigger !== 'undefined') {
        return 2;
    } else {
        return 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const version = "0.1.8.1";
    const changeThemeQuery = self.matchMedia("(prefers-color-scheme: dark)");

    console.log(`SoundDark v${version} - https://github.com/michioxd/sounddark\nLocal saved: ${localStorage.getItem("SoundDark_mode") ?? "no"}\nSystem color: ${changeThemeQuery.matches ? "dark" : "light"}\nPlatfrom: ${getBrowserPlatform() === 2 ? "firefox" : getBrowserPlatform() === 1 ? "chromium" : "unknown"}`);

    /**
     * Function to load SoundDark main stylesheet
     * @param {boolean} remove If true, the style must be remove
     */
    function LoadTheme(remove) {
        switch (remove) {
            case true:
                if (document.getElementById('sounddarkInjected') !== null) {
                    document.getElementById('sounddarkInjected').remove();
                }
                break;
            default:
                if (document.getElementById('sounddarkInjected') == null) {
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

    }

    if (localStorage.getItem("SoundDark_dismissCre") === "yes") {
        document.body.classList.add("SoundDarkDisableCre");
    }

    switch (localStorage.getItem("SoundDark_mode")) {
        case "system":
            document.body.classList.add("SoundDarkModeSystem");
            if (changeThemeQuery.matches) {
                LoadTheme(false);
            }
            break;
        case "light":
            LoadTheme(true);
            break;
        default:
            LoadTheme(false);
    }

    changeThemeQuery.onchange = function (e) {
        if (localStorage.getItem("SoundDark_mode") === "system") {
            LoadTheme(e.matches !== false ? false : true);
        }
    }

    function GetTitle() {
        switch (localStorage.getItem("SoundDark_mode")) {
            case "system":
                return "Automatic (System)";
            case "light":
                return "Light";
            default:
                return "Dark";
        }
    }

    function ToggleTheme() {
        switch (localStorage.getItem("SoundDark_mode")) {
            case "system":
                localStorage.setItem("SoundDark_mode", "light");
                document.body.classList.remove("SoundDarkModeSystem");
                LoadTheme(true);
                break;
            case "light":
                localStorage.setItem("SoundDark_mode", "dark");
                document.body.classList.remove("SoundDarkModeSystem");
                LoadTheme(false);
                break;
            default:
                localStorage.setItem("SoundDark_mode", "system");
                document.body.classList.add("SoundDarkModeSystem");
                LoadTheme(self.matchMedia("(prefers-color-scheme: dark)").matches !== false ? false : true);
        }
        document.getElementById("SoundDarkMenu_ToggleThemeButton").title = GetTitle();
    }

    function ToggleCre() {
        if (localStorage.getItem("SoundDark_dismissCre") === "yes") {
            document.body.classList.remove("SoundDarkDisableCre");
            localStorage.removeItem("SoundDark_dismissCre");
        } else if (confirm("[SoundDark Extension] Do you want to disable creator line at footer? :((")) {
            document.body.classList.add("SoundDarkDisableCre");
            localStorage.setItem("SoundDark_dismissCre", "yes");
        }
    }

    (new MutationObserver(function () {
        if (self.location.pathname.startsWith("/you/insights/overview") && localStorage.getItem("SoundDark_dismissDark") !== "yes") {
            if (document.querySelector(".insightsIframe")) {
                if (document.querySelector(".insightsIframe").src !== "https://insights-ui.soundcloud.com/?darkmode=true") {
                    document.querySelector(".insightsIframe").src = 'https://insights-ui.soundcloud.com/?darkmode=true';
                }
            }
        }

        const targetMenu = document.querySelector(".headerMenu.moreMenu");
        const SDMenu = document.getElementById("SoundDarkMenu");

        if (targetMenu && !SDMenu) {
            targetMenu.innerHTML += `
                <style>.SoundDarkModeSystem #SoundDarkMenu #SDD_AutoIcon{display:block!important}.SoundDarkModeSystem #SoundDarkMenu #SDD_DarkIcon,.SoundDarkModeSystem #SoundDarkMenu #SDD_LightIcon{display:none!important}</style>
                <ul id="SoundDarkMenu" class="headerMenu__list sc-list-nostyle">
    <small style="padding: 0.5rem;color:gray;font-weight: normal;font-size:9px">SoundDark v${version} by <a
            target="_blank" href="https://github.com/michioxd">michioxd</a></small>
    <div style="display:flex;flex-direction:row;align-items:center">
        <a title="SoundDark GitHub" style="width:100%;justify-content:center;display:flex" class="headerMenu__link moreMenu__link"
            target="_blank" href="https://github.com/michioxd/sounddark">
            <svg style="fill:#333" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 496 512">
                <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
        </a>
        <a title="Changelog" style="width:100%;justify-content:center;display:flex" class="headerMenu__link moreMenu__link"
            target="_blank" href="https://github.com/michioxd/sounddark/blob/main/CHANGELOG.md">
            <svg style="fill:#333" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                <path
                    d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
            </svg>
        </a>
        <a title="${GetTitle()}" style="cursor:pointer;width:100%;justify-content:center;display:flex"
            id="SoundDarkMenu_ToggleThemeButton" class="headerMenu__link moreMenu__link">
            <svg style="fill:#333;display: none;" id="SDD_DarkIcon" xmlns="http://www.w3.org/2000/svg" height="1.5em"
                viewBox="0 0 384 512">
                <path
                    d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>
            <svg style="fill:#333" id="SDD_LightIcon" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                <path
                    d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" style="fill:#333;display: none;" id="SDD_AutoIcon" height="1.5em" viewBox="0 -960 960 960" width="1.5em"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm40-83q119-15 199.5-104.5T800-480q0-123-80.5-212.5T520-797v634Z"/></svg>
        </a>
        <a title="Disable/Enable creator line at footer" style="display:none;cursor:pointer;width:100%;justify-content:center;display:flex" class="headerMenu__link moreMenu__link"
            target="_blank" id="SoundDarkMenu_ToggleCreatorTag">
            <svg style="fill:#333" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        </a>
    </div>
</ul>`;
            document.getElementById("SoundDarkMenu_ToggleThemeButton").addEventListener('click', ToggleTheme);
            document.getElementById("SoundDarkMenu_ToggleCreatorTag").addEventListener('click', ToggleCre);
        }

    })).observe(self.document.documentElement, { attributes: true, childList: true, subtree: true });
});
