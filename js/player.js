/* =========================
   获取元素
========================= */

const musicToggle =
    document.querySelector(".music-toggle");

const musicPanel =
    document.querySelector(".music-panel");

const audio =
    document.getElementById("bgm");

const playBtn =
    document.getElementById("playBtn");

/* =========================
   面板展开/收起
========================= */

if (musicToggle && musicPanel) {

    musicToggle.addEventListener("click", () => {

        musicPanel.classList.toggle("show");

    });

}

/* =========================
   恢复音量
========================= */

const savedVolume =
    localStorage.getItem("musicVolume");

if (savedVolume !== null && audio) {

    audio.volume = Number(savedVolume);

} else if (audio) {

    audio.volume = 0.5;

}

/* =========================
   恢复播放状态
========================= */

const wasPlaying =
    localStorage.getItem("musicPlaying");

if (wasPlaying === "true" && audio) {

    audio.play().catch(() => {});

}

/* =========================
   播放暂停
========================= */

if (playBtn && audio) {

    playBtn.addEventListener("click", () => {

        if (audio.paused) {

            audio.play();

            playBtn.textContent = "⏸";

            localStorage.setItem(
                "musicPlaying",
                "true"
            );

        } else {

            audio.pause();

            playBtn.textContent = "▶";

            localStorage.setItem(
                "musicPlaying",
                "false"
            );

        }

    });

}

/* =========================
   初始化按钮状态
========================= */

if (audio && playBtn) {

    if (!audio.paused) {

        playBtn.textContent = "⏸";

    } else {

        playBtn.textContent = "▶";

    }

}

/* =========================
   音量记忆接口
========================= */

audio?.addEventListener("volumechange", () => {

    localStorage.setItem(

        "musicVolume",

        audio.volume

    );

});

/* =========================
   播放结束自动循环
========================= */

audio?.addEventListener("ended", () => {

    audio.currentTime = 0;

    audio.play();

});

/* =========================
   自动更新按钮状态
========================= */

audio?.addEventListener("play", () => {

    if (playBtn) {

        playBtn.textContent = "⏸";

    }

});

audio?.addEventListener("pause", () => {

    if (playBtn) {

        playBtn.textContent = "▶";

    }

});

/* =========================
   未来歌单接口
========================= */

const playlist = [

    {
        title: "星空列车",
        file: "assets/music/music.mp3"
    }

];

/*
未来扩展示例

playlist.push({

    title:"夜空之歌",

    file:"assets/music/song2.mp3"

});

*/

/* =========================
   自动播放尝试
========================= */

window.addEventListener("load", () => {

    if (!audio) return;

    audio.play()

    .then(() => {

        localStorage.setItem(
            "musicPlaying",
            "true"
        );

    })

    .catch(() => {

        console.log(
            "浏览器阻止自动播放，需要用户点击。"
        );

    });

});

/* =========================
   点击页面自动启动音乐
========================= */

document.addEventListener(

    "click",

    () => {

        if (!audio) return;

        if (audio.paused) {

            audio.play().catch(() => {});

        }

    },

    { once: true }

);

/* =========================
   ESC关闭音乐面板
========================= */

document.addEventListener(

    "keydown",

    (e) => {

        if (e.key === "Escape") {

            musicPanel?.classList.remove(
                "show"
            );

        }

    }

);

/* =========================
   点击外部关闭面板
========================= */

document.addEventListener(

    "click",

    (e) => {

        if (
            !musicPanel ||
            !musicToggle
        ) return;

        const insidePanel =
            musicPanel.contains(e.target);

        const insideBtn =
            musicToggle.contains(e.target);

        if (!insidePanel && !insideBtn) {

            musicPanel.classList.remove(
                "show"
            );

        }

    }

);