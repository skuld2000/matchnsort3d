const LiffSDKError = 
{
    InitalizeLiffSDK : 30000,
    SharePickerTarget : 30001,
    CloseLiffBrowser : 30002,
    ShareMessagePickerTarget : 30003
};

function ResponseSuccessToLiffSDKHandler(requestId, responseText)
{
    const response = JSON.stringify
    (
        {
            requestId : requestId,
            status : 200,
            code : 0,
            responseText:  responseText
        }
    )
    window.unityInstance.SendMessage("LiffSDKHandler", "OnLiffSDKResponseSuccess", response);
}

function ResponseFailToLiffSDKHandler(requestId, code, responseText)
{
    const response = JSON.stringify
    (
        {
            requestId : requestId,
            status : 2000,
            code : code,
            responseText:  responseText
        }
    )
    window.unityInstance.SendMessage("LiffSDKHandler", "OnLiffSDKResponseFailed", response);
}

window.initalizeLiffSDK = async function(requestId, liffId)
{
    var isLiff = liff.isInClient();
    console.log("initalizeLiffSDK requestId[%s] liffId[%s]",requestId, liffId);
    try
    {
        if(liff.isInClient())
        {
            await liff.init({
                liffId : liffId,
            });

            if(!liff.isLoggedIn()) {
                liff.login();
                };

            ResponseSuccessToLiffSDKHandler(requestId, isLiff);
        }else{
            ResponseFailToLiffSDKHandler(requestId, LiffSDKError.InitalizeLiffSDK, "Is LIFF Client False");
        }


        
    }
    catch(error)
    {
        ResponseFailToLiffSDKHandler(requestId, LiffSDKError.InitalizeLiffSDK, "initalizeLiffSDK[fail]");
    }
}

window.GetAccessTokenLiffSDK = function(requestId)
{
    // const responseText = JSON.stringify
    // (
    //     {
    //         accessToken : liff.getAccessToken()
    //     }
    // )

    let accessTokenValue;

    if (liff.isInClient() && liff.isLoggedIn() && liff.getAccessToken) {
        accessTokenValue = liff.getAccessToken();
    } 

    const responseText = JSON.stringify({
        accessToken: accessTokenValue
    });

    ResponseSuccessToLiffSDKHandler(requestId, responseText);
}

window.SharePickerTarget = async function(requestId, altText, thumbnailImageUrl, title, text, label, uri)
{
    try
    {
        if(liff.isInClient())
        {
        await liff.shareTargetPicker(
        [
            {
                type: "template",
                altText: altText,
                template: 
                {
                    type: "buttons", 
                    thumbnailImageUrl: thumbnailImageUrl,
                    imageAspectRatio: "rectangle",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
                    title: title,
                    text: text,
                    actions: [
                        {
                            type: "uri",
                            label: label,
                            uri: uri
                        }
                    ]
                }
            },
        ],
        {
            isMultiple: true,
        }
        );
        }

        ResponseSuccessToLiffSDKHandler(requestId, "SharePickerTarget[success]");
    }
    catch(error)
    {
        ResponseFailToLiffSDKHandler(requestId, LiffSDKError.SharePickerTarget, error.message);
    }
}

window.ShareMessagePickerTarget = async function(requestId, text)
{
    try
    {
        if(liff.isInClient())
        {
        await liff.shareTargetPicker(
        [
            {
                type: "text",
                text: text,
            },
        ],
        {
            isMultiple: true,
        }
        );
        }

        ResponseSuccessToLiffSDKHandler(requestId, "ShareMessagePickerTarget[success]");
    }
    catch(error)
    {
        ResponseFailToLiffSDKHandler(requestId, LiffSDKError.ShareMessagePickerTarget, error.message);
    }
}

window.CloseLiffBrowser = function(requestId, url)
{
    try{
        if(liff.isInClient())
        {
            liff.closeWindow();
        }
        ResponseSuccessToLiffSDKHandler(requestId, "LogOutLiffSDK[success]");
    }
    catch(error) {
        ResponseFailToLiffSDKHandler(requestId, LiffSDKError.CloseLiffBrowser, error.message);
    }
}

window.ShortCutHomeScreen = function(requestId, liffId)
{
    liff.createShortcutOnHomeScreen({
      url: "https://liff.line.me/" + liffId,
    })
    .then(() => {
        
    })
    .catch((error) => {
        
    });
}
