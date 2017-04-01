angular.module('starter.directives', [])
.directive("xdHref", function() {
	console.log("ok");
  return function linkFn (scope, elem, attrs) {
     scope.$watch(attrs.xdHref, function(newVal) {
       if (newVal) {
         elem.attr("href", newVal);
       }
     });
  };
})
.directive("filesInput", function() {
	console.log("ok");
  return {
      require: "ngModel",
      link: function linkFn (scope, elem, attrs, ngModel) {
         elem.on("change", function (e) {
             ngModel.$setViewValue(elem[0].files);
         });
      }
  };
});

