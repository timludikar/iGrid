# iGrid - intelligent Grid Image System
=======================================
Well, not necessarily intelligent at the moment but it is on its way there.
Tasked with developing a HTML5 page with a grid of images in varying sizes.  Ranging for 1x1, 2x1, and 1x2 images, I wanted to create a JQuery plugin to automatically place images where necessary.

I'm sure there are other better plugins, but this worked well for me and I hope to continually improve it.  Please feel free to fork it.

## Usage
--------
<code>
<header>
	<link href="/css/iGrid.css" rel="stylesheet" type="text/css">
	<script src="jquery-1.9.1.min.js"></script>
</header>

<body>
	<div class="grid">
		<div row="1">
			<img />
			<img />
			<img />
			<img />
			<img />
			<img />
		</div>
	
		<div row="2">
			<img />
			<img />
			<img />
			<img />
			<img />
		</div>
	</div>

	<script>
		$('.grid').iGrid({
			width: 	"500",
			height:	"500",
		});
	</script>
</body>
</code>

