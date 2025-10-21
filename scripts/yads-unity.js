
window.initalizeYads = function()
{
    window.YJ_YADS = window.YJ_YADS || {task:[]};

    const adDiv = document.getElementById('yads');
    adDiv.addEventListener('noAd', (event) =>
    {
        window.unityInstance.SendMessage("YadsSDKHandler", "OnYadsNoAd");
    }
    );

    adDiv.addEventListener('rewardAdGranted', (event) =>
    {
        window.unityInstance.SendMessage("YadsSDKHandler", "OnYadsRewardGranted");
    }
    );
    
    const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
            
                if (adDiv.style.display !== 'none' || adDiv.classList.contains('ad-active')) {
                    //console.log("광고가 화면에 표시되었습니다.");
                    window.unityInstance.SendMessage("YadsSDKHandler", "OnYadsRewardOpen");
                } else {
                    //console.log("광고가 화면에서 사라졌습니다.");
                    window.unityInstance.SendMessage("YadsSDKHandler", "OnYadsRewardClose");
                }
            }
        });
    });
    
    const adDivBanner = document.getElementById('yadsBanner');
    adDivBanner.addEventListener('noAd', (event) =>
    {
        window.unityInstance.SendMessage("YadsSDKHandler", "OnYadsNoAdBanner");
    }
    );

    adDivBanner.addEventListener('rewardAdGranted', (event) =>
    {
        window.unityInstance.SendMessage("YadsSDKHandler", "OnYadsRewardGrantedBanner");
    }
    );
}

window.showAd = function(adId)
{
    window.YJ_YADS.tasks.push(
        {
            yads_ad_ds:adId,
            yads_parent_element:'yads'
        }
    );
}

window.showAdBanner = function(adId)
{
    window.YJ_YADS.tasks.push(
        {
            yads_ad_ds:adId,
            yads_parent_element:'yadsBanner'
        }
    );
}

