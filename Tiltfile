docker_compose("docker-compose.yml")


docker_build('pr_mania-api','api',
live_update=[
    sync('./api/src','/api/src'),
    run('npm install', trigger='./api/package.json'),
    restart_container()
])

# docker_build('pr_mania-ui','fe',
# live_update=[
#     sync('./fe/src','/app/src'),
#     sync('./fe/public','/app/public'),
#     run('npm install', trigger='./fe/package.json'),
#     restart_container()
# ])
# dc_resource(
#         "pr_mania-api",
#         trigger_mode=TRIGGER_MODE_AUTO,
#         labels=["backend"],
# )
dc_resource(
        "pr_mania-ui",
        trigger_mode=TRIGGER_MODE_AUTO,
        labels=["ui"],
        resource_deps=["pr_mania-api"],
    )