# 동영상 컷편집 프로그램
## 프로그램 사용법
1. ffmpeg 다운로드 및 환경변수 PATH 설정: https://ffmpeg.org/download.html

    터미널에서 `ffmpeg -version` 명령어를 입력하여 버전이 출력되면 성공적으로 설치된 것입니다.
2. ```assets``` 폴더를 생성하여 동영상 파일을 넣습니다.
3. ```{아무이름}.csv``` 파일을 생성하여 컷편집 정보를 입력합니다.
    ```
    video,start_time,end_time
    assets/{동영상 파일 이름},{시작 시간},{종료 시간}
    assets/{동영상 파일 이름},{시작 시간},{종료 시간}
    ...
    ```
    - ```start_time```, ```end_time```은 ```%H:%M:%S``` 형식으로 작성되어야 합니다.
    - 예시: ```example.csv```
4. 터미널에서 ```npm run start -- {csv 파일 이름}``` 명령어를 입력합니다.
    - 예시: ```npm run start -- example.csv```
5. 컷편집이 완료되면 ```output.mp4``` 파일이 생성됩니다.
    -  ```dist``` 폴더에는 합쳐지기 전의 컷파일이 저장됩니다.
