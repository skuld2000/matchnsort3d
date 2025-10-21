window.NVClipboardWebGL = window.NVClipboardWebGL || {};

window.NVClipboardWebGL.SetTextJS = function(text)
{
    if (navigator.clipboard && window.isSecureContext) 
    {
        navigator.clipboard.writeText(text)
        .then(() =>
        {
          window.unityInstance.SendMessage("NVClipboardWebGL", "OnNVClipboardWebGLCallback", "true");
        })
        .catch(err => 
        {
          window.unityInstance.SendMessage("NVClipboardWebGL", "OnNVClipboardWebGLCallback", "false");
        });
    }
    else
        window.unityInstance.SendMessage("NVClipboardWebGL", "OnNVClipboardWebGLCallback", "false");
}
