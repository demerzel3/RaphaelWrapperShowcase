/*!
 * RaphaelWrapper Showcase project
 *
 * Copyright (c) 2011 Gabriele Genta (http://gabrielegenta.wordpress.com/)
 * Licensed under the MIT license.
 */
/*globals Showcase */

// This page describes the main user interface for your application.  
Showcase.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'leftView canvasView'.w(),

    leftView: SC.View.design({
      layout: { left: 0, top: 0, bottom: 0, width: 250 },
      childViews: "titleLabel shapeRadio isDraggableBox createNewButton animateButton clearButton".w(),

      titleLabel: SC.LabelView.design({
        layout: { left: 0, top: 16, right: 0, height: 18 },
        textAlign: SC.ALIGN_CENTER,
        value: "RapahelWrapper Showcase"
      }),

      shapeRadio: SC.RadioView.design({
        layout: { left: 10, top: 50 },
        items: [
          { title: "Rectangle", value: "rect" },
          { title: "Circle", value: "circle" },
          { title: "Path", value: "path" },
          { title: "Text", value: "text" },
          { title: "Group", value: "group" }
        ],
        value: 'rect',
        itemTitleKey: 'title',
        itemValueKey: 'value'
      }),

      isDraggableBox: SC.CheckboxView.design({
        layout: { left: 130, top: 50 },
        title: "Draggable",
        value: YES
      }),

      createNewButton: SC.ButtonView.design({
        layout: { top: 170, left: 30, right: 30, height: 24 },
        title: "Create New",
        isDefault: YES,
        action: "createNew",
        target: "Showcase.mainPage"
      }),
      animateButton: SC.ButtonView.design({
        layout: { top: 200, left: 30, right: 30, height: 24 },
        title: "Animate",
        action: "animate",
        target: "Showcase.mainPage"
      }),
      clearButton: SC.ButtonView.design({
        layout: { top: 227, left: 30, right: 30, height: 24 },
        title: "Clear",
        action: "clear",
        target: "Showcase.mainPage"
      })

    }),

    canvasView: Raphael.CanvasView.design({
      layout: { left: 250, top: 0, right: 0, bottom: 0 },

      elementDragEnd: function(dragEvent) {
        return YES;
      }
    })
  }),

  canvas: null,
  canvasBinding: "Showcase.mainPage.mainPane.canvasView",
  lastX: 10,
  lastY: 10,
  createNew: function() {
    var shapeType = Showcase.getPath("mainPage.mainPane.leftView.shapeRadio.value");
    var isDraggable = Showcase.getPath("mainPage.mainPane.leftView.isDraggableBox.value");
    var hue = Math.random();
    var shape;
    if ("rect" === shapeType) {
      shape = Raphael.Rect.create({
        attrs: {
          r: 3+Math.round(Math.random()*20),
          width: 100+Math.round(Math.random()*50),
          height: 75+Math.round(Math.random()*30)
        }
      });
    } else if ("circle" === shapeType) {
      shape = Raphael.Circle.create({
        attrs: {
          r: 25+Math.round(Math.random()*50)
        }
      });
    } else if ("path" === shapeType) {
      // sample paths, copied from: http://raphaeljs.com/icons/
      var paths = [
        // cloud
        "M24.345,13.904c0.019-0.195,0.03-0.392,0.03-0.591c0-3.452-2.798-6.25-6.25-6.25c-2.679,0-4.958,1.689-5.847,4.059c-0.589-0.646-1.429-1.059-2.372-1.059c-1.778,0-3.219,1.441-3.219,3.219c0,0.21,0.023,0.415,0.062,0.613c-2.372,0.391-4.187,2.436-4.187,4.918c0,2.762,2.239,5,5,5h15.875c2.762,0,5-2.238,5-5C28.438,16.362,26.672,14.332,24.345,13.904z",
        // umbrella
        "M17.081,4.065V3.137c0,0,0.104-0.872-0.881-0.872c-0.928,0-0.891,0.9-0.891,0.9v0.9C4.572,3.925,2.672,15.783,2.672,15.783c1.237-2.98,4.462-2.755,4.462-2.755c4.05,0,4.481,2.681,4.481,2.681c0.984-2.953,4.547-2.662,4.547-2.662c3.769,0,4.509,2.719,4.509,2.719s0.787-2.812,4.557-2.756c3.262,0,4.443,2.7,4.443,2.7v-0.058C29.672,4.348,17.081,4.065,17.081,4.065zM15.328,24.793c0,1.744-1.8,1.801-1.8,1.801c-1.885,0-1.8-1.801-1.8-1.801s0.028-0.928-0.872-0.928c-0.9,0-0.957,0.9-0.957,0.9c0,3.628,3.6,3.572,3.6,3.572c3.6,0,3.572-3.545,3.572-3.545V13.966h-1.744V24.793z",
        // pin
        "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",
        // file
        "M23.024,5.673c-1.744-1.694-3.625-3.051-5.168-3.236c-0.084-0.012-0.171-0.019-0.263-0.021H7.438c-0.162,0-0.322,0.063-0.436,0.18C6.889,2.71,6.822,2.87,6.822,3.033v25.75c0,0.162,0.063,0.317,0.18,0.435c0.117,0.116,0.271,0.179,0.436,0.179h18.364c0.162,0,0.317-0.062,0.434-0.179c0.117-0.117,0.182-0.272,0.182-0.435V11.648C26.382,9.659,24.824,7.49,23.024,5.673zM22.157,6.545c0.805,0.786,1.529,1.676,2.069,2.534c-0.468-0.185-0.959-0.322-1.42-0.431c-1.015-0.228-2.008-0.32-2.625-0.357c0.003-0.133,0.004-0.283,0.004-0.446c0-0.869-0.055-2.108-0.356-3.2c-0.003-0.01-0.005-0.02-0.009-0.03C20.584,5.119,21.416,5.788,22.157,6.545zM25.184,28.164H8.052V3.646h9.542v0.002c0.416-0.025,0.775,0.386,1.05,1.326c0.25,0.895,0.313,2.062,0.312,2.871c0.002,0.593-0.027,0.991-0.027,0.991l-0.049,0.652l0.656,0.007c0.003,0,1.516,0.018,3,0.355c1.426,0.308,2.541,0.922,2.645,1.617c0.004,0.062,0.005,0.124,0.004,0.182V28.164z",
        // comic
        "M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z",
        // lightning
        "M25.371,7.306c-0.092-3.924-3.301-7.077-7.248-7.079c-2.638,0.001-4.942,1.412-6.208,3.517c-0.595-0.327-1.28-0.517-2.01-0.517C7.626,3.229,5.772,5.033,5.689,7.293c-2.393,0.786-4.125,3.025-4.127,5.686c0,3.312,2.687,6,6,6v-0.002h5.271l-2.166,3.398l1.977-0.411L10,30.875l9.138-10.102L17,21l2.167-2.023h4.269c3.312,0,6-2.688,6-6C29.434,10.34,27.732,8.11,25.371,7.306zM23.436,16.979H7.561c-2.209-0.006-3.997-1.792-4.001-4.001c-0.002-1.982,1.45-3.618,3.35-3.931c0.265-0.043,0.502-0.191,0.657-0.414C7.722,8.41,7.779,8.136,7.73,7.87C7.702,7.722,7.685,7.582,7.685,7.446C7.689,6.221,8.68,5.23,9.905,5.228c0.647,0,1.217,0.278,1.633,0.731c0.233,0.257,0.587,0.375,0.927,0.309c0.342-0.066,0.626-0.307,0.748-0.63c0.749-1.992,2.662-3.412,4.911-3.41c2.899,0.004,5.244,2.35,5.251,5.249c0,0.161-0.009,0.326-0.027,0.497c-0.049,0.517,0.305,0.984,0.815,1.079c1.86,0.344,3.274,1.966,3.271,3.923C27.43,15.186,25.645,16.973,23.436,16.979z",
        // pencil
        "M25.31,2.872l-3.384-2.127c-0.854-0.536-1.979-0.278-2.517,0.576l-1.334,2.123l6.474,4.066l1.335-2.122C26.42,4.533,26.164,3.407,25.31,2.872zM6.555,21.786l6.474,4.066L23.581,9.054l-6.477-4.067L6.555,21.786zM5.566,26.952l-0.143,3.819l3.379-1.787l3.14-1.658l-6.246-3.925L5.566,26.952z"
      ];
      shape = Raphael.Path.create({
        attrs: {
          path: paths[Math.round(Math.random()*(paths.length-1))],
          "stroke-width": 0
        }
      });
    } else if ("text" === shapeType) {
      var words = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor orci, congue bibendum auctor sed, facilisis eget ligula. Vivamus imperdiet ipsum nec mauris feugiat bibendum. Quisque ac risus vitae ligula placerat molestie facilisis id tellus. Vestibulum a sem quis massa consectetur ultrices in eu diam. Vestibulum id mauris sed mi convallis volutpat at a lectus. Proin nec velit purus. Suspendisse at mauris tortor.".w();
      var families = ["Arial", "Tahoma", "Courier New", "Times New Roman", "Trebuchet MS"];
      shape = Raphael.Text.create({
        attrs: {
          text: words[Math.round(Math.random()*(words.length-1))],
          "font-size": 30 + Math.random()*50,
          "font-family": families[Math.round(Math.random()*(families.length-1))],
          "text-anchor": "start",
          "font-weight": Math.random()>0.5?"bold":"regular"
        }
      });
    } else if ("group" === shapeType) {
      var highlight = Raphael.Rect.create({
        attrs: {
          width: 260,
          height: 45,
          r: 10,
          fill: "white",
          "fill-opacity": 0.7,
          "stroke-width": 2,
          stroke: "black",
          "stroke-opacity": 0.7
        }
      });
      var border = Raphael.Rect.create({
        attrs: {
          width: 250,
          height: 35,
          r: 5,
          x: 5,
          y: 5,
          fill: "270-hsb(%@1, 0.5, .80)-hsb(%@1, 0.5, .60)".fmt(hue),
          "stroke-width": 2,
          stroke: "hsb(%@1, 1, .10)".fmt(hue)
        }
      });
      var captionShadow = Raphael.Text.create({
        attrs: {
          text: "Group Example",
          "font-size": 30,
          fill: "black",
          "fill-opacity": 0.5,
          x: 130,
          y: 24.5
        }
      });
      var caption = Raphael.Text.create({
        attrs: {
          text: "Group Example",
          "font-size": 30,
          fill: "white",
          x: 130,
          y: 22.5
        }
      });

      shape = Raphael.Group.create();
      shape.pushElement(highlight);
      shape.pushElement(border);
      shape.pushElement(captionShadow);
      shape.pushElement(caption);
    }

    // apply additional styling
    if ("group" !== shapeType) {
      shape.attr({ fill: "270-hsb(%@1, .90, 1)-hsb(%@1, .60, 1)".fmt(hue) });
      if ("rect" === shapeType || "circle" === shapeType) {
        shape.attr({
          stroke: "hsb(%@1, 1, .25)".fmt(hue),
          "stroke-width": Math.round(Math.random()*10)
        });
      }
    }
    this.lastX += 10;
    this.lastY += 10;
    var frame = this.canvas.get("frame");
    shape.set("isDraggable", isDraggable);
    shape.set("location", {x: Math.random()*frame.width-100, y: Math.random()*frame.height-100});
    this.canvas.add(shape);
    if ("path" === shapeType) {
      // act directly on the path's native element to make the icon bigger
      shape.nativeElement.scale(3+Math.random()*5);
    }
  },
  animate: function() {
    var children = this.canvas.get("children");
    if (children.length > 0) {
      var randomShape = children[Math.round(Math.random()*(children.length-1))];
      var frame = this.canvas.get("frame");
      randomShape.animate({location: {x: frame.width/2, y: frame.height/2}}, 1500, "<>");
    } else {
      SC.AlertPane.error("Create a shape first.");
    }
  },
  clear: function() {
    this.canvas.removeAll();
  }

});
