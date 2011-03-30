// ==========================================================================
// Project:   Showcase - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
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
        layout: { top: 150, left: 30, right: 30, height: 24 },
        title: "Create New",
        isDefault: YES,
        action: "createNew",
        target: "Showcase.mainPage"
      }),
      animateButton: SC.ButtonView.design({
        layout: { top: 180, left: 30, right: 30, height: 24 },
        title: "Animate",
        action: "animate",
        target: "Showcase.mainPage"
      }),
      clearButton: SC.ButtonView.design({
        layout: { top: 207, left: 30, right: 30, height: 24 },
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
  lastPoint: {x: 10, y: 10},
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
          height: 75+Math.round(Math.random()*30),
          fill: "270-hsb(%@1, .75, 1)-hsb(%@1, .75, .80)".fmt(hue),
          stroke: "hsb(%@1, .75, .45)".fmt(hue),
          "stroke-width": Math.round(Math.random()*10)
        }
      });
    } else if ("circle" === shapeType) {
      var radius = 25+Math.round(Math.random()*50);
      shape = Raphael.Circle.create({
        attrs: {
          x: radius,
          y: radius,
          r: radius,
          fill: "270-hsb(%@1, .90, 1)-hsb(%@1, .60, 1)".fmt(hue),
          stroke: "hsb(%@1, .25, 1)".fmt(hue),
          "stroke-width": Math.round(Math.random()*10)
        }
      });
    } else if ("path" === shapeType) {
    } else if ("group" === shapeType) {
    }
    this.lastPoint.x += 10;
    this.lastPoint.y += 10;
    shape.set("isDraggable", isDraggable);
    shape.set("location", {x: this.lastPoint.x, y: this.lastPoint.y});
    this.canvas.add(shape);
  },
  animate: function() {
  },
  clear: function() {
  }

});
