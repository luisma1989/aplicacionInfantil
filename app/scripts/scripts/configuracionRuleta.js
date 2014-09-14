var transformProp = Modernizr.prefixed('transform');

  function Carousel3D ( el ) {
    this.element = el;

    this.rotation = 0;
    this.panelCount = 0;
    this.totalPanelCount = this.element.children.length;
    this.theta = 0;

    this.isHorizontal = true;

  }

  Carousel3D.prototype.modify = function() {

    var panel, angle, i;

    this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.theta = 360 / this.panelCount;

    this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

    for ( i = 0; i < this.panelCount; i++ ) {
      panel = this.element.children[i];
      angle = this.theta * i;
      panel.style.opacity = 1;
      panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
      panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    }

    for (  ; i < this.totalPanelCount; i++ ) {
      panel = this.element.children[i];
      panel.style.opacity = 0;
      panel.style[ transformProp ] = 'none';
    }

    this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

    this.transform();

  };

  Carousel3D.prototype.transform = function() {
    this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
  };

  var carousel;

  var init = function() {

    carousel = new Carousel3D( document.getElementById('carousel') ),
        panelCountInput = document.getElementById('panel-count'),
        navButtons = document.querySelectorAll('#botonRuleta'),

        onNavButtonClick = function( event ){
          var increment = Math.ceil(Math.random()* 50 + 15);
          carousel.rotation += carousel.theta * increment * -1;
          carousel.transform();
        };

    carousel.panelCount = parseInt( panelCountInput.value, 10);
    carousel.modify();

    setTimeout( function(){
      document.body.addClassName('ready');
    }, 0);

  };