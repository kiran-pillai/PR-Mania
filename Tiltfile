docker_compose("docker-compose.yml")


docker_build('pr_mania-api','api',
live_update=[
    sync('./api/src','/api/src'),
    run('npm install', trigger='./api/package.json'),
    restart_container()
])

docker_build('pr_mania-ui','fe',
live_update=[
    sync('./fe/src','/app/src'),
    sync('./fe/public','/app/public'),
    sync('./fe/vite.config.ts','/app/vite.config.ts'),
    run('npm install', trigger='./fe/package.json'),
]
)