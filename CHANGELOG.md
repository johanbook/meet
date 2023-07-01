# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version)
for commit guidelines.

## 1.0.0 (2023-07-01)

### Features

- **api:** add chat functionality
  ([bd4e542](https://github.com/johanbook/meet/commit/bd4e54229c16c682d0e51499606260457047aaf9))
- **api:** add classifications module
  ([16e59ff](https://github.com/johanbook/meet/commit/16e59ff0d3b135ab0e6e45a29bc89a5c273d1980))
- **api:** add command for creating settings
  ([ecb5f6a](https://github.com/johanbook/meet/commit/ecb5f6a2847c6e4dbe79cded6cc4530fea00c16c))
- **api:** add command for removing photo
  ([8239ba4](https://github.com/johanbook/meet/commit/8239ba411c2c5b00539cf916a54cb6d1bdad3ae1))
- **api:** add command logging
  ([48cde8d](https://github.com/johanbook/meet/commit/48cde8d967cabc4b209b31c59e189f9dfd6b6638))
- **api:** add csv parser utilities
  ([a855d23](https://github.com/johanbook/meet/commit/a855d23caf824013c5185b9bd41b01a2a9559cd0))
- **api:** add date validation
  ([8635d58](https://github.com/johanbook/meet/commit/8635d585e9d979f67e691abdcfa0bdf3a9b4c2bb))
- **api:** add decorators to mark seeder environment
  ([94c7c86](https://github.com/johanbook/meet/commit/94c7c8603f63a8bc3ebf6c0e0d649ba36f6f4eb2))
- **api:** add exception logging
  ([dc20317](https://github.com/johanbook/meet/commit/dc20317ac9e06be4968945d8d536bfea6e6fbe01))
- **api:** add gender classification
  ([91417c8](https://github.com/johanbook/meet/commit/91417c8dfbe16b8f054d68f14eb24ee60d10e1ef))
- **api:** add healthcheck endpoints
  ([0e318c2](https://github.com/johanbook/meet/commit/0e318c2bd1b0c4ca7e6aafbcb3063219114b1dce))
- **api:** add helper for running csv classification migrations
  ([5d76a39](https://github.com/johanbook/meet/commit/5d76a39f04d31065e14a9b5fb1bbd0a964b7ba43))
- **api:** add ids when logging internal errors
  ([4751543](https://github.com/johanbook/meet/commit/475154315ce65884724bf687092ecf3464a4f508))
- **api:** add last message and photo to match
  ([750aee6](https://github.com/johanbook/meet/commit/750aee61c30774d01f3931cba2d2ca999e82d31a))
- **api:** add log level
  ([8ca75a7](https://github.com/johanbook/meet/commit/8ca75a710769da80422d2863cf015c4c2f2e0f50))
- **api:** add matches mapper
  ([951cf01](https://github.com/johanbook/meet/commit/951cf013a6091a97e42a60c6210cf8a57dceb58e))
- **api:** add nationalizaton to classifictions
  ([34d4df8](https://github.com/johanbook/meet/commit/34d4df8fcb2324371483b0cd72414dd01d0554f1))
- **api:** add notificaton hub
  ([267cfee](https://github.com/johanbook/meet/commit/267cfee067f682dbf520a028510b6eef63b7862e))
- **api:** add permission endpoints
  ([4f34248](https://github.com/johanbook/meet/commit/4f34248cd9ba2dbdabd13dc470a13157352c3337))
- **api:** add permission entity
  ([3cafe54](https://github.com/johanbook/meet/commit/3cafe54d8a265e5beb434c4fa493d904a5048059))
- **api:** add s3 object storage
  ([3bbb68a](https://github.com/johanbook/meet/commit/3bbb68a1f46f449a661d2ccd4f1f92e0a5e7c01d))
- **api:** add settings endpoints
  ([9604500](https://github.com/johanbook/meet/commit/9604500e7b25332cb30d8d4d6a6c1ac191357d93))
- **api:** add skeleton for wingman
  ([e866360](https://github.com/johanbook/meet/commit/e86636077fe4faa0c50994a3402438eb1a0c393a))
- **api:** add trace log level
  ([2ec5242](https://github.com/johanbook/meet/commit/2ec5242a3a7512d5c8da6b1a500d0eb9b4bf1795))
- **api:** avoid showing profiles already swiped on
  ([354ddc9](https://github.com/johanbook/meet/commit/354ddc9d344705472a4fcb2d1efb56a9be6fb532))
- **api:** create command journal
  ([069841d](https://github.com/johanbook/meet/commit/069841d98ed3cb0894b0ec773497bce758bf305c))
- **api:** expose public s3 urls in profile details
  ([0b4f78a](https://github.com/johanbook/meet/commit/0b4f78a516b043267e829b06eebfc275bc8026f9))
- **api:** expose sender id on chat message ws updates
  ([50c130b](https://github.com/johanbook/meet/commit/50c130beeae7469d6f3d94be4af59fabff91d3e4))
- **api:** expose user id and correlation id on pino logs
  ([af34ef7](https://github.com/johanbook/meet/commit/af34ef755808361d06606242e58f7dc9f99b389b))
- **api:** fetch profile id from db on swipes
  ([8978022](https://github.com/johanbook/meet/commit/8978022360d4ec3b3b73797a5035d4e8ecc83ebf))
- **api:** format command names in journal query
  ([1c33a0a](https://github.com/johanbook/meet/commit/1c33a0a93b7f6fd519785fcb3efb3eefb6876a3e))
- **api:** group matches by messages
  ([9167378](https://github.com/johanbook/meet/commit/916737847197f7cd96a6ec6cc98d1491bf7caf87))
- **api:** implement authorization
  ([abebb82](https://github.com/johanbook/meet/commit/abebb82a75a0538fe876d62b2aab93577ab6da8c))
- **api:** include message timestamp in matches
  ([3cc0009](https://github.com/johanbook/meet/commit/3cc0009dcf38782d1d747c23ff763fa9fe15ae0c))
- **api:** return if match on swipe
  ([8f067d3](https://github.com/johanbook/meet/commit/8f067d3f29ef6ac629b2ea6ffbe503c6a9335cb5))
- **api:** send notification on new chat message
  ([374e810](https://github.com/johanbook/meet/commit/374e8103de9748bb99e0fdb108442a1436d0c32e))
- **api:** store swipe results in database
  ([306a357](https://github.com/johanbook/meet/commit/306a3571956965a6d9c5b49f1c0c8cfc4b46594e))
- **api:** support classification parents
  ([e085e66](https://github.com/johanbook/meet/commit/e085e66f9c9756481d6d927ab757eb2bec1408eb))
- **api:** support job scheduling
  ([cfac459](https://github.com/johanbook/meet/commit/cfac45955abe75384b372eb5cb62b548201bf73e))
- **auth:** add favicon
  ([dafe4fa](https://github.com/johanbook/meet/commit/dafe4fafe42376076173e2d95919c25f4cdb3d94))
- **auth:** add logout endpoint
  ([588ca7f](https://github.com/johanbook/meet/commit/588ca7f85a36e342785cbc13a06d349b76c84c80))
- **auth:** add logout endpoint
  ([e676095](https://github.com/johanbook/meet/commit/e67609548dc89ff43e6bd2d66d0be41b7be7bb1f))
- **auth:** improve logging
  ([50f681b](https://github.com/johanbook/meet/commit/50f681b8b9d525bd8544c2fb993e42f6b2af1d42))
- **homepage:** add homepage
  ([2394a75](https://github.com/johanbook/meet/commit/2394a758fc4121dc58d5ddbebdbbc6a5afd5e778))
- **homepage:** add ui components
  ([a38d742](https://github.com/johanbook/meet/commit/a38d74202d709f32dc1c42ef041d7fe55b446ea3))
- initial commit
  ([7a70166](https://github.com/johanbook/meet/commit/7a70166016f6f7ada0efab0bedb6c19ad7cbde10))
- **tracking:** add tracking service
  ([ff3e3dd](https://github.com/johanbook/meet/commit/ff3e3dd3cb08b1c8bd1604b5db84667c5b08562e))
- **tracking:** enrich tracking events with request data
  ([559dc3e](https://github.com/johanbook/meet/commit/559dc3eef1f312a633a511e554f3e8625416c0fb))
- **tracking:** support batch logs
  ([49cd52e](https://github.com/johanbook/meet/commit/49cd52e3ece7158f151300febdf8522693698869))
- **web-ui:** add 404 page
  ([5614c59](https://github.com/johanbook/meet/commit/5614c59f3e306891524ebc78eff645c2c2d38947))
- **web-ui:** add authentication guard
  ([68aaffe](https://github.com/johanbook/meet/commit/68aaffe41eb3bd010fcb0ef7833fa1e1e23e8c6e))
- **web-ui:** add back-navigation in chat
  ([c874a88](https://github.com/johanbook/meet/commit/c874a88f05bec35cf7792f6f7af30ca6ad15be7e))
- **web-ui:** add button core component
  ([970dd79](https://github.com/johanbook/meet/commit/970dd7974dbab962abe190a0a5ec575fca015130))
- **web-ui:** add chat page for a profile
  ([be4ebc5](https://github.com/johanbook/meet/commit/be4ebc5677400739e8d47576a4e5701a78e4cdfc))
- **web-ui:** add description to swipeable profile
  ([396a9b7](https://github.com/johanbook/meet/commit/396a9b763d7020ca067f15f3e4780eb8265517fb))
- **web-ui:** add english locale for profile page
  ([391ee54](https://github.com/johanbook/meet/commit/391ee546abd4dcfc187391917dc5551589504833))
- **web-ui:** add error page
  ([5611a77](https://github.com/johanbook/meet/commit/5611a775c6da891a5ad58ee073cbe451eb4c0302))
- **web-ui:** add fade transition in profile creation
  ([428e370](https://github.com/johanbook/meet/commit/428e37057f25783f9a9082ef02302d661c52c7db))
- **web-ui:** add favicon
  ([7df4ab9](https://github.com/johanbook/meet/commit/7df4ab94453f76b8cfbd17ca9bf48b8b0820813b))
- **web-ui:** add feature for removing profile photos
  ([f0b3757](https://github.com/johanbook/meet/commit/f0b37576d0372e56560f9bf2a1e0ca0cd7b42c2e))
- **web-ui:** add journal page
  ([fe679ee](https://github.com/johanbook/meet/commit/fe679eea6a96910cb4db6ea2ba5bbcfb28859ec1))
- **web-ui:** add logger
  ([5d075cd](https://github.com/johanbook/meet/commit/5d075cdf4ef522c9e7a2c792e34cb9ee8955507c))
- **web-ui:** add photo viewer
  ([6d9aca2](https://github.com/johanbook/meet/commit/6d9aca240d01d8be2d44e0c4e071fd92083c2460))
- **web-ui:** add swiping animation
  ([9738c56](https://github.com/johanbook/meet/commit/9738c562098a155c90b137b09c29369b1d779666))
- **web-ui:** allow uploading profile photo
  ([959edd2](https://github.com/johanbook/meet/commit/959edd28cf365498210480002ef5ffa8466a73f2))
- **web-ui:** cleanup list of new matches
  ([53437e9](https://github.com/johanbook/meet/commit/53437e9ba8afc7141346c59fccf39176df129d1f))
- **web-ui:** force creating profile on first login
  ([4f53cce](https://github.com/johanbook/meet/commit/4f53cce6d0e362f004978c035d0139eb16aa3cb1))
- **web-ui:** group matches by those talked to and not talked to
  ([6779954](https://github.com/johanbook/meet/commit/67799546d053d906d425d939c3bac2c430f2aed0))
- **web-ui:** implement swiper
  ([2bcf6ba](https://github.com/johanbook/meet/commit/2bcf6ba5a28a2f5919fbe6897b7e490d9ef289d8))
- **web-ui:** improve loading skeletons
  ([2a57b14](https://github.com/johanbook/meet/commit/2a57b148d2bda0ea0bb19eb1cfcf00d3ff987962))
- **web-ui:** improve styling of chat textfield
  ([ce58e61](https://github.com/johanbook/meet/commit/ce58e61e06562f4d372c8dd79ada2a51321bd425))
- **web-ui:** indicate in chat messages sent by current user
  ([a9bb7e7](https://github.com/johanbook/meet/commit/a9bb7e72f3003bc47f24d6f512e68bf47e77a0cf))
- **web-ui:** log failed queries and mutation by default
  ([a13debe](https://github.com/johanbook/meet/commit/a13debed3e9ac8e6475b1f5e0812027a4e421880))
- **web-ui:** log navigation events
  ([bb2493f](https://github.com/johanbook/meet/commit/bb2493f6b0ee4bc84a7d12c88f6514af6ad4a65b))
- **web-ui:** log snackbar events
  ([37d6c99](https://github.com/johanbook/meet/commit/37d6c990af3507db6095678d7be80716af391ca2))
- **web-ui:** make profile creation a multi-stage form
  ([af96d8c](https://github.com/johanbook/meet/commit/af96d8c4c35cc9161626553765839160de383500))
- **web-ui:** properly handle click events on swipeable items
  ([d489cca](https://github.com/johanbook/meet/commit/d489cca32fbbb97348bf2f5c983170293a506461))
- **web-ui:** refresh chat messages on update
  ([1c60c30](https://github.com/johanbook/meet/commit/1c60c301e19a8bef275c86fae7ddc72b4690bad5))
- **web-ui:** ship logs to trackiing service
  ([70fc0d0](https://github.com/johanbook/meet/commit/70fc0d0498ca9a061aaba15c0a3f00d99f4b4d2d))
- **web-ui:** show indification if match
  ([253565d](https://github.com/johanbook/meet/commit/253565dfffe8118dc749b4fe81af1ab97099bb78))
- **web-ui:** show matches in ui
  ([e1f0ecf](https://github.com/johanbook/meet/commit/e1f0ecfecf9055d88ecaba8317ec7a8139079664))
- **web-ui:** show notifications in snackbar
  ([501ba39](https://github.com/johanbook/meet/commit/501ba394c112e45259ad213dd73ed1a39d398594))
- **web-ui:** show profile image and last message on match
  ([467b673](https://github.com/johanbook/meet/commit/467b673f1b68f9d0a75e41e70bb259eb3f62f73b))
- **web-ui:** show snackbar when updating profile description
  ([5251acb](https://github.com/johanbook/meet/commit/5251acbeb56f6020e7c8c206dd0f146309e85317))
- **web-ui:** store result when swiping
  ([1d36f22](https://github.com/johanbook/meet/commit/1d36f228f50d6ef70d6d6de6e290eb9852622ad2))
- **web-ui:** store swipes in ui
  ([1f4425e](https://github.com/johanbook/meet/commit/1f4425e5b5fc16d22b6abb39ed257f572b6589fb))
- **web-ui:** use error page on main pages
  ([3db052d](https://github.com/johanbook/meet/commit/3db052d8de02754adaa24dcd9e76633c5755b06c))
- **web-ui:** use new logging endpoint
  ([7c0ecdc](https://github.com/johanbook/meet/commit/7c0ecdcdb3cd92b0abd0f45d1af8fa29f56ee3a6))
- **web-ui:** use proper date picker
  ([cb307ef](https://github.com/johanbook/meet/commit/cb307ef1e9e124a669072157c62ab6d267a9f191))

### Bug Fixes

- **api:** add missing controller
  ([29d871d](https://github.com/johanbook/meet/commit/29d871d21df4928223ef13f65e7845f1f507e93b))
- **api:** add missing module dependency
  ([c4096b8](https://github.com/johanbook/meet/commit/c4096b810965b5fbd0912303b4f9e7eb11abbf02))
- **api:** add missing validation mapping
  ([2933631](https://github.com/johanbook/meet/commit/29336314aa93e138cc3c45b19066cbc42f48fa09))
- **api:** avoid seeding test data on prod
  ([420d70b](https://github.com/johanbook/meet/commit/420d70bec154b78d03cdc6649540933121aa2ae9))
- **api:** enforce unique swipes
  ([39f1b9e](https://github.com/johanbook/meet/commit/39f1b9ec19e2e80c068235b8d3908c6dfeb52e6c))
- **api:** ensure migrations can run in prod
  ([3e241e2](https://github.com/johanbook/meet/commit/3e241e29c0cdc3f843fd5998c286314b085ef00b))
- **api:** fix broken import paths
  ([4ca97b3](https://github.com/johanbook/meet/commit/4ca97b3077c184ad745d9f17ff863dd7a922e4ca))
- **api:** fix failing test for date of birth in profile creation
  ([3bf85f5](https://github.com/johanbook/meet/commit/3bf85f5bbaa246bc4b1e47d8b390853e1590dedf))
- **api:** fix incorrect migration glob
  ([ee60a38](https://github.com/johanbook/meet/commit/ee60a382f819dec867adf48cbaa792a40a786d7b))
- **api:** fix incorrect module import
  ([36538cd](https://github.com/johanbook/meet/commit/36538cd061f5efef4f47325b3ef66da88b0cdc18))
- **api:** fix regression in http exception handler
  ([0d77580](https://github.com/johanbook/meet/commit/0d775800d1c26ba6b93d58338c1c02d324c0cf5c))
- **api:** fix typo in profile migration
  ([bb6592b](https://github.com/johanbook/meet/commit/bb6592b4916a0c8b3aefc52303c576066500f01d))
- **api:** improve diagnostics logging
  ([8727150](https://github.com/johanbook/meet/commit/8727150d700e7028a989a09ce18b123bf0fa6cb2))
- **api:** properly include if current user sent chat message
  ([eea49a5](https://github.com/johanbook/meet/commit/eea49a5bb8a5d0d185c38a21ed8ea0b6b383ad79))
- **api:** properly return http exceptions to client
  ([c05086f](https://github.com/johanbook/meet/commit/c05086f6d639202ccc65106445fd837e01cdce36))
- **api:** release db connection in healthcheck
  ([dc430d1](https://github.com/johanbook/meet/commit/dc430d15d797836249e640803fa1914cfcddc665))
- **api:** remove profile field in entity
  ([6441bed](https://github.com/johanbook/meet/commit/6441bedf5126df5b579b80e3f963a4ee8ae54b21))
- **api:** return correct match ids
  ([8e5c205](https://github.com/johanbook/meet/commit/8e5c2057d9f73b6fabdb1d301314fc287ef966a6))
- **api:** set node env in production
  ([f45ffb6](https://github.com/johanbook/meet/commit/f45ffb60d2f21262e3683de42e682af1039d09cb))
- **api:** show last sent message on all matches
  ([8b7b3fb](https://github.com/johanbook/meet/commit/8b7b3fbd7c70b8d18970efe22bec1970761593cd))
- **api:** sort matches by time of last sent message
  ([7e8a82d](https://github.com/johanbook/meet/commit/7e8a82d718b295feb4d81b9a4b5b267c67695572))
- **api:** unmaterialize matches view
  ([183aada](https://github.com/johanbook/meet/commit/183aada2c365d606c19c00556f038904cb1ab90d))
- **api:** use correct query param for chat message ids
  ([c3d0727](https://github.com/johanbook/meet/commit/c3d072784a455082986b0c4f447ba195176d0e5c))
- **api:** use correct s3 path for profile images
  ([5e9bed4](https://github.com/johanbook/meet/commit/5e9bed41ef4aba89bee7eecff2e7f8fe8c46b1d8))
- **auth:** add missing log levels
  ([f2f33d7](https://github.com/johanbook/meet/commit/f2f33d71b5260cb9666071cb584ddb5f0c5c2d5f))
- **auth:** add own error response on failed authentication
  ([daf0b75](https://github.com/johanbook/meet/commit/daf0b75ef397472981e93469870e7ea8a3c23d28))
- **auth:** use domain from env
  ([5eb7a2c](https://github.com/johanbook/meet/commit/5eb7a2c42b3f1c7ceec494d279318cc80f6d0fb1))
- **auth:** use proper redirect after logging in
  ([cc940b1](https://github.com/johanbook/meet/commit/cc940b19cbe03222df51f70c142b4458d0f17f9e))
- **console:** show correct urls in console
  ([66876c4](https://github.com/johanbook/meet/commit/66876c40ec2e0660e3ac160ce942608301b64a7c))
- **tracking:** remove errornous start script
  ([0e33a74](https://github.com/johanbook/meet/commit/0e33a7475061b8b7aabb135bfe391bfba1446651))
- **web-ui:** add correct margin in bottom for navigation
  ([fc5caf7](https://github.com/johanbook/meet/commit/fc5caf7f1754890412a3d2e88376f9dafa4dcc3e))
- **web-ui:** add error message on failed image upload
  ([b136ef9](https://github.com/johanbook/meet/commit/b136ef953d9410afd8bab2aefd3c57d631cb56e3))
- **web-ui:** add swiping
  ([9a4f6a2](https://github.com/johanbook/meet/commit/9a4f6a2acc4fa8042b617b1f1d97f0c79cfc1430))
- **web-ui:** allow serving custom paths
  ([d2d90b5](https://github.com/johanbook/meet/commit/d2d90b5172f4a50092b13ebd5f43d47d5a20f4e6))
- **web-ui:** display chat text field in bottom of view
  ([8bb447d](https://github.com/johanbook/meet/commit/8bb447dd188de26e2540b2812daefdd8c3dc96aa))
- **web-ui:** fix height issue on android devices
  ([d82c3bc](https://github.com/johanbook/meet/commit/d82c3bc5ec6486e26f473b04034f29d09df29e3f))
- **web-ui:** fix incorrect type
  ([d4bc7b8](https://github.com/johanbook/meet/commit/d4bc7b85d340cdae8b3e557d73ec420979eb78de))
- **web-ui:** show messages in correct order
  ([c5fe417](https://github.com/johanbook/meet/commit/c5fe417d758546e6a1614629d3eb9a65c6fb9d08))
- **web-ui:** update chat on new message
  ([7425afd](https://github.com/johanbook/meet/commit/7425afdcf0ada88f9ffb887726ab6bcf9238cb43))
- **web-ui:** update formulation for profile creation
  ([0ac8ff2](https://github.com/johanbook/meet/commit/0ac8ff2c4587dfccc985f4d76b101e929b4383a5))
- **web-ui:** update logging message
  ([b81cd71](https://github.com/johanbook/meet/commit/b81cd7129d249ec05fd228826141107e8ece123a))
- **web-ui:** use correct api url
  ([8e3018c](https://github.com/johanbook/meet/commit/8e3018ca2559dc8060cc01116b49e0b01de86626))
- **web-u:** send chat id when querying chats
  ([a2bf3f7](https://github.com/johanbook/meet/commit/a2bf3f7f70e07eb463d741771127187868b55a27))
