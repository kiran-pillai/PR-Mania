docker_compose("docker-compose.yml")


dc_resource(
        "pr_mania-api",
        trigger_mode=TRIGGER_MODE_AUTO,
        labels=["backend"],
    )
dc_resource(
        "pr_mania-ui",
        trigger_mode=TRIGGER_MODE_AUTO,
        labels=["ui"],
        resource_deps=["pr_mania-api"],
    )