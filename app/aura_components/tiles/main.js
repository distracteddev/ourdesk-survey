define(['text!./tiles.html', 'http://fengmk2.github.com/emoji/emoji.js'], function(template, jEmoji) {
  return {
    initialize: function() {
      var tplData = {
      	boxes: [
      		{
      			heading: 'Test Heading 1',
      			text: 'Some Text',
      			size: '32'
      		},
      		{
      			heading: 'Test Heading 2',
      			text: 'Some More Text',
      			size: '33'
      		},
      		{
      			heading: 'Test Heading 3',
      			text: 'Some More Text'
      		},
      		{
      			heading: 'Test Heading 4',
      			text: 'Some More Text'
      		},
      		{
      			heading: 'Test Heading 5',
      			text: 'Some More Text'
      		},
      	]
      }


      this.setupBones();
      this.api.search();
      console.log('Hello 5');
    },
    render: function(tplData) {
    	this.html(_.template(template, tplData));
    	$("#boxCtn").nested({
    		animate: true,
    		gutter: 10,
    		resizeToFit: false,
    		animationOptions: {
  		    speed: 100,
  		    duration: 200,
  		    queue: false
    		}
    	});
    	this.parseEmoji();
    	$('#box').flowtype({
    		fontRatio : 30,
    	});
    },
    parseEmoji: function() {
    	var $text = $('.boxText').each(function(i,el) {
    		var $el = $(el);
    		var html = $el.html().trim().replace(/\n/g, '<br/>');
    		$el.html(jEmoji.unifiedToHTML(html));
    	});
    },
    setupBones: function() {
    	var self = this;
    	this.api = bone.io('ourdesk', {
    	    outbound: {
    	        routes: ['search']
    	    },
    	    inbound: {
    	        results: function(data, context) {
    	        	var boxes = _.compact(_.pluck(data, 'payload'));
    	        	boxes = _.filter(boxes, function(box) {
    	        		return box.text.indexOf('RT') === -1;
    	        	});
    	        	window.boxes = boxes;
    	          self.render({boxes: boxes});
    	        },
    	        newbox: function(data, context) {
    	        	console.log('Got new box', data)
    	        	var boxes = _.template(template, {boxes: [data.payload]});
  	        	  $("#boxCtn").prepend(boxes).nested('prepend', boxes);
    	        }
    	    }
    	});
    }
  };
});
