var myModule = angular.module('Angello', []);

myModule.factory('AngelloHelper', function() {
    var buildIndex = function (source, property) {
        var tempArray = [];

        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.service('AngelloModel', function() {
    var service = this,
        statuses = [
            {name: '백로그'},
            {name: '해야할 일'},
            {name: '진행 중'},
            {name: '코드 리뷰'},
            {name: 'QA 리뷰'},
            {name: '검증 완료'},
            {name: '종료'}
        ],
        types = [
            {name: '기능'},
            {name: '개선'},
            {name: '버그'},
            {name: '스파이크'}
        ],
        stories = [
            {
                title: '첫 번째 스토리',
                description: '첫 번째 사용자 스토리',
                criteria: '요구사항 정리 중...',
                status: '해야할 일',
                type: '기능',
                reporter: '웹지니',
                assignee: '웹지니'
            },
            {
                title: '두 번째 스토리',
                description: '두 번째 사용자 스토리',
                criteria: '요구사항 정리 중...',
                status: '백로그',
                type: '기능',
                reporter: '웹지니',
                assignee: '웹지니'
            },
            {
                title: '세 번째 스토리',
                description: '세 번째 사용자 스토리',
                criteria: '요구사항 정리 중...',
                status: '코드 리뷰',
                type: '개선',
                reporter: '웹지니',
                assignee: '웹지니'
            }
        ];

    service.getStatuses = function () {
        return statuses;
    };

    service.getTypes = function () {
        return types;
    };

    service.getStories = function () {
        return stories;
    };
});

myModule.controller('MainCtrl', function(AngelloModel, AngelloHelper) {
    var main = this;

    main.types = AngelloModel.getTypes();
    main.statuses = AngelloModel.getStatuses();
    main.stories = AngelloModel.getStories();
    main.typesIndex = AngelloHelper.buildIndex(main.types, 'name');
    main.statusesIndex = AngelloHelper.buildIndex(main.statuses, 'name');

    main.setCurrentStory = function (story) {
        main.currentStory = story;
        main.currentStatus = main.statusesIndex[story.status];
        main.currentType = main.typesIndex[story.type];
    };

    main.createStory = function() {
        main.stories.push({
            title: '새 사용자 스토리',
            description: '설명을 입력하세요.',
            criteria: '요구사항 정리 중...',
            status: '백로그',
            type: '기능',
            reporter: '미정',
            assignee: '미정'
        });
    };

    main.setCurrentStatus = function (status) {
        if (typeof main.currentStory !== 'undefined') {
            main.currentStory.status = status.name;
        }
    };

    main.setCurrentType = function (type) {
        if (typeof main.currentStory !== 'undefined') {
            main.currentStory.type = type.name;
        }
    };
});

myModule.directive('story', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
    }
});
