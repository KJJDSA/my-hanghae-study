<img src='https://github.com/SteamReviewSearch/.github/blob/main/image/SteamForYOU.jpg'>

# log_Life_Cycle
엘라스틱의 로그 수명주기 관리

# INFO

빠른 시간이내에 엘라스틱의 생명 주기 시스템을 이해 및 구현이 힘들듯하여 node를 사용한 스케줄링과 엘라스틱 search,delete 기능을 합쳐 만든 엘라스틱의 유저 로그 생명주기 관리 코드

# 코드 시나리오

1. node logLifeCycle.js 으로 시작한다.
2. 현재 시간을 받은 plan이라는 변수를 기점으로 현재 시간이 plan보다 빠를 경우 work를 작동하게 한다. (주기: one hour)
3. work 함수에서는 30일 이내의 유저로그를 엘라스틱이 search로 가지고오며 가지고온 로그를 delete로 로그를 삭제한다.
4. plan에 현재시간에 한시간을 더한 시간을 할당한다.
5. 2번에서 반복


