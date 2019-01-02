class crossInput {
    constructor(input, options = {}) {
        this.input = input;
        this.params =  Object.assign({}, {
            divWrap: true,
            paddingLeft: 25,
            color: undefined,
            left: undefined,
            bottom: undefined,
            icon: undefined,
            zIndex: 10,
            onClear: undefined,
            size: undefined,
            clearIf: function() { return true; },
        }, options);
        this.handler();
    }

    handler() {
        if (this.input.data('hasCrossInput')) {
            return;
        }
        this.parentContainer.append(this.cross);
        this.eventsListening();
        this.input.data('hasCrossInput', true);
    }

    eventsListening() {
        let $this = this;
        $(document).ready(function() {
            $this.cross.on('mouseover', function() {
                $(this).css({'opacity': '1'});
            });
            $this.cross.on('mouseout', function() {
                $(this).css({'opacity': '0.5'});
            });
            $this.cross.on('click', function() {
                if (typeof $this.params.clearIf === 'function' && $this.params.clearIf()) {
                    $this.input.val('');
                    $this.input.focus();
                    if (typeof $this.params.onClear === 'function')
                        $this.params.onClear();
                }
            });
        });

    }

    get cross() {
        if (this._cross) {
            return this._cross;
        }
        if (this.params.icon) {
            var cross = $(this.params.icon);
        } else {
            let svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="' + this.fontSize + '" height="' + this.fontSize + '" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;" xml:space="preserve">' +
                '<g>' +
                    '<path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z" fill="' + this.crossColor + '"/>' +
                '</g>' +
            '</svg>';
            var cross = $(svg);
        }
        cross.css({
            'display': 'block',
            'position': 'absolute',
            'bottom': this.bottom + 'px',
            'left': this.left + 'px',
            'opacity': '0.5',
            'z-index': this.params.zIndex,
            'cursor': 'pointer',
            '-webkit-touch-callout': 'none',
            '-webkit-user-select': 'none',
            '-khtml-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
        });
        this._cross = cross;

        return this._cross;
    }

    get parentContainer() {
        if (this._parentContainer) {
            return this._parentContainer;
        }
        if ( !this.params.divWrap ) {
            return this._parentContainer = this.input.parent();
        }
        this.input.wrap('div');
        let parent = this.input.parent();
        parent.css({
            'border': 'none',
            'height': this.inputHeight + 'px',
            'position': 'relative',
        });

        return this._parentContainer = parent;
    }

    get bottom() {
        if (this._bottom) {
            return this._bottom;
        }
        if (this.params.bottom === undefined) {
            let crossHeight = this.fontSize;
            this._bottom = (this.inputHeight - crossHeight) / 2;
        } else {
            this._bottom = this.params.bottom;
        }

        return this._bottom;
    }

    get left() {
        if (this._left) {
            return this._left;
        }
        if (this.params.left === undefined) {
            let crossWitdh = this.fontSize;

            return this._left = ((this.params.paddingLeft - crossWitdh) / 2) + 1;
        }

        return this._left = this.params.left;
    }

    get crossColor() {
        return this._crossColor ? this._crossColor : (this.params.color === undefined ? window.getComputedStyle(this.input[0]).getPropertyValue("color") : this.params.color);
    }

    get fontSize() {
        return this._fontSize ? this._fontSize : (((typeof this.params.size == 'number') ? this.params.size : 8.2) + 'px');
    }

    get inputHeight() {
        if (this._inputHeight) {
            return this._inputHeight;
        }
        return this._inputHeight = this.input.outerHeight(true);
    }
}

$.fn.crossInput = function(options) {
    let crosses = [];
    $(this).each(function() {
        crosses.push(new crossInput($(this), options));
    });

    return crosses;
}

/**
* Allows to add a cross which will permit you to clear an input when click
*
* @param {Object} options.divWrap Booleen qui permet de configurer si ou pas l'input doit être entouré d'une div
* @param {Object} options.paddingLeft Le pagging left à appliquer au input pour placer le cross clear
* @param {Object} options.color La couleur du cross clear
* @param {Object} options.left Le propriété left à appliquer au cross clear si non satisafait du positionnement automatique
* @param {Object} options.bottom La propriété bottom à appliquer au cross clear si non satisfait du positionnement automaituqe
* @param {Object} options.icon Le code HTML de l'icone par laquelle on souhaite remplacer le cross clear par défaut
* @param {Object} options.zIndex Le zIndex à appliquer au cross clear si non satisfait du z-index par défaut qui est 10
* @param {Object} options.onClear La callback qui s'ecxécute après que le contenu du input ait été effacé
* @param {Object} options.clearIf La qui lorqu'elle est définit détermine quand on peut vider ou pas l'input.
*/
/*$.fn.inputArcel = function(options) {
  $(this).each(function() {
    var $this = $(this);

    if ( $this.data('hasInputArcel') )
      return;
  else {
      $this.data('hasInputArcel', true);
      var param =  Object.assign({}, {
        divWrap: true,
        paddingLeft: 25,
        color: undefined,
        left: undefined,
        bottom: undefined,
        icon: undefined,
        zIndex: 10,
        onClear: undefined,
        size: undefined,
        clearIf: function() { return true; },
    }, options);

      var crossColor = param.color === undefined ? window.getComputedStyle($this[0]).getPropertyValue("color") : param.color;
      var fontSize = ((typeof param.size == 'number') ? param.size : 8.2) + 'px';

      var inputHeight = $this.outerHeight(true);

      if ( !param.divWrap ) {
        var parent = $this.parent();
    }
    else {
        $this.wrap('<div></div>');
        var parent = $this.parent();
        parent.css({
            'border': 'none',
            'height': inputHeight + 'px',
            'position': 'relative',
      });
    }

    if (param.icon) {
        var cross = $(param.icon);
    }
    else {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="' + fontSize + '" height="' + fontSize + '" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;" xml:space="preserve">' +
            '<g>' +
                '<path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z" fill="' + crossColor + '"/>' +
            '</g>' +
        '</svg>';
        var cross = $(svg);
    }
    parent.prepend(cross);


    cross.on('click', function() {
        if (typeof param.clearIf === 'function' && param.clearIf()) {
          $this.val('');
          $this.focus();
          if (typeof param.onClear === 'function')
            param.onClear();
    }
});


        //Stylisation
        if (param.bottom === undefined) {
          var crossHeight = cross.outerHeight();
          var bottom = (inputHeight - crossHeight) / 2;
      }
      else {
          bottom = param.bottom;
      }

        //
        if (param.left === undefined) {
          var crossWitdh = cross.width();
          var left = ((param.paddingLeft - crossWitdh) / 2) + 1;
      }
      else {
          left = param.left;
      }

      $this.css({
          'padding-left': param.paddingLeft + 'px',
      });
      cross.css({
          'display': 'block',
          'position': 'absolute',
          'bottom': bottom + 'px',
          'left': left + 'px',
          'opacity': '0.5',
          'z-index': param.zIndex,
          'cursor': 'pointer',
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none',
          '-khtml-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
      });
      cross.on('mouseover', function() {
          $(this).css({'opacity': '1',});
      });
      cross.on('mouseout', function() {
          $(this).css({'opacity': '0.5',});
      });
  }
});
};*/
