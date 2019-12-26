// call the function to change hrefs when the page is loaded or when the addon is installed
changeHrefs();


// call the function to change hrefs when some content is changed (e.g. more links loaded)
// observe the whole page
var mutationTarget = document.documentElement;
// set observer to call the function to change hrefs
var mutationObserver = new MutationObserver(changeHrefs);
// observe additions and removals of content, observe all descendants of the target
var mutationConfig = {"childList": true, "subtree": true};
// set observer
mutationObserver.observe(mutationTarget, mutationConfig);


// changes hrefs of all links to a channel homepage to videos page of that channel
function changeHrefs()
{
	// all <a> tags
	var tags = document.getElementsByTagName("a");
	// for each <a> tag
	for(var i = 0; i < tags.length; i++)
	{		
		// if the href matches /user/someChannelName or /channel/someChannelName
		var regex = /(\/(user|channel)\/[^\/\?]*)(\?.*)?$/;
		if(regex.test(tags[i].href))
		{
			// stops propagation of the "click" event on <a> tags
			tags[i].addEventListener("click", stopPropagation);			
			
			var matches = tags[i].href.match(regex);
			// matches[0] is the whole match
			// matches[1] is matched group 1: /user/someChannelName or /channel/someChannelName
			// matches[3] is matched group 3: the character '?' and anything after it
			
			// add /videos after the channel name 
			tags[i].href = "https://www.youtube.com" + matches[1] + "/videos" + ((matches[3] != undefined) ? matches[3] : "");				
		}
	}
}

// function that stops propagation of the "click" event on target links
// is defined outside changeHrefs() so that only one eventListener is attached per link
function stopPropagation(e){e.stopPropagation();}