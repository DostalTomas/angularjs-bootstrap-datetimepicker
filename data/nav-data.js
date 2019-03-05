angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "bootstrap-datetimepicker",
        "type": "groups",
        "href": "api/bootstrap-datetimepicker",
        "navItems": [
          {
            "name": "component",
            "type": "section",
            "href": "api/bootstrap-datetimepicker/component",
            "navItems": [
              {
                "name": "datetimepicker",
                "type": "component",
                "href": "api/bootstrap-datetimepicker/component/datetimepicker"
              }
            ]
          },
          {
            "name": "type",
            "type": "section",
            "href": "api/bootstrap-datetimepicker/type",
            "navItems": [
              {
                "name": "DateObject",
                "type": "type",
                "href": "api/bootstrap-datetimepicker/type/DateObject"
              },
              {
                "name": "DateTimePickerConfiguration",
                "type": "type",
                "href": "api/bootstrap-datetimepicker/type/DateTimePickerConfiguration"
              }
            ]
          }
        ]
      }
    ]
  }
});
