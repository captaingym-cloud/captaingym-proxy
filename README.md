# 캡틴짐 AI 프록시 서버 (Vercel)

브라우저에서 Anthropic API를 직접 호출하면 CORS 정책에 막혀서 작동하지 않습니다.
이 프록시 서버를 중간에 두면, 브라우저는 이 서버를 호출하고 이 서버가 대신 Anthropic API를 호출해줍니다.

## 배포 방법

1. https://vercel.com 가입 (깃헙 계정으로 로그인 가능)
2. 이 폴더(vercel-proxy)를 별도 깃헙 레포로 새로 만들어서 업로드
   (기존 PT- 레포와는 다른 새 레포로 만드는 것을 추천)
3. Vercel 대시보드에서 "Add New Project" → 방금 만든 레포 선택 → Deploy
4. 배포 완료 후 Settings → Environment Variables 에서
   Key: ANTHROPIC_API_KEY
   Value: (Anthropic 콘솔에서 발급받은 API 키, sk-ant-로 시작)
   추가하고 저장
5. Deployments 탭에서 다시 배포(Redeploy) 한 번 더 실행 (환경변수 적용을 위해)
6. 배포된 주소 확인 (예: https://captaingym-claude-proxy.vercel.app)
7. 이 주소를 pt_journal.html 안의 PROXY_URL 부분에 붙여넣기

## 확인 방법

배포된 주소 + /api/claude 로 접속해서 (예: https://your-project.vercel.app/api/claude)
브라우저에 에러 메시지가 JSON 형태로 뜨면 정상 작동 중인 것입니다.
(GET 요청은 거부되도록 만들어놨기 때문에 "Method not allowed" 메시지가 뜨면 정상입니다.)
