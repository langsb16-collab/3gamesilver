# 3GameSilver - 호흡 게임 애플리케이션

## 프로젝트 개요
- **이름**: 3GameSilver
- **목표**: 재미있는 호흡 운동을 통한 건강 관리
- **주요 기능**: 
  - 3가지 호흡 게임 (파랑새, 불꽃, 태양)
  - 호흡 타이밍 가이드 및 진행 표시
  - 세션 기록 저장 및 조회
  - React 기반 인터랙티브 UI

## 배포 URL
- **프로덕션**: https://3gamesilver.pages.dev
- **커스텀 도메인**: https://feezone.kr
- **GitHub**: https://github.com/langsb16-collab/3gamesilver
- **최신 배포**: https://0de9a6c1.3gamesilver.pages.dev

## 기술 스택
- **프론트엔드**: React 19, TailwindCSS, Motion (Framer Motion), Lucide React
- **백엔드**: Cloudflare Pages Functions
- **데이터베이스**: Cloudflare D1 (SQLite)
- **빌드 도구**: Vite 6
- **배포 플랫폼**: Cloudflare Pages

## 데이터 구조
- **Sessions 테이블**:
  - `id`: 고유 식별자 (자동 증가)
  - `date`: 생성 일시 (자동 타임스탬프)
  - `game_type`: 게임 타입 (bluebird, flame, sun)
  - `duration`: 세션 지속 시간 (초)
  - `score`: 점수

## API 엔드포인트
- `GET /api/sessions` - 최근 10개 세션 조회
- `POST /api/sessions` - 새 세션 기록
  - Body: `{ game_type, duration, score }`

## 사용자 가이드
1. **게임 선택**: 메인 화면에서 3가지 호흡 게임 중 하나를 선택
2. **호흡 운동**: 화면의 가이드를 따라 호흡 운동 수행
   - 파랑새: 하늘을 나는 새를 호흡으로 조종
   - 불꽃: 불꽃의 크기를 호흡으로 조절
   - 태양: 태양의 빛을 호흡으로 조절
3. **기록 확인**: 운동 완료 후 자동으로 세션 기록 저장
4. **히스토리**: 이전 세션 기록 조회 가능

## 로컬 개발 환경
```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드
npm run build

# Cloudflare Pages Dev로 미리보기
npm run preview

# D1 마이그레이션 (로컬)
npm run db:migrate:local

# D1 마이그레이션 (프로덕션)
npm run db:migrate:prod
```

## 배포 정보
- **플랫폼**: Cloudflare Pages
- **상태**: ✅ Active
- **D1 Database**: lotto0124-db (9481b5f9-5fc8-4cf4-89a1-ea1e0ee443a3)
- **마지막 업데이트**: 2026-03-13

## 주요 업데이트
- ✅ Cloudflare Pages Functions를 통한 API 구현
- ✅ D1 데이터베이스 통합
- ✅ 커스텀 도메인 feezone.kr 연결
- ✅ React + Motion을 이용한 인터랙티브 UI
- ✅ 세션 기록 저장 및 조회 기능

## 다음 개발 계획
1. 사용자 통계 대시보드 추가
2. 게임별 난이도 설정 기능
3. 소셜 공유 기능
4. 모바일 최적화 개선
5. 다국어 지원 (영어, 일본어)

## 라이선스
MIT License
