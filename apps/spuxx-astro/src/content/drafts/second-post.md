---
title: 'My adventures in the world of Kubernetes & GitOps'
description: 'I recently set out into the world of Kubernetes and GitOps. Here is how that journey went.'
pubDate: '2023-05-15'
# heroImage: '/placeholder-hero.jpg'
---

import Image from '/src/components/common/Image.astro';

I'll admit it: I'm somewhat of a late bloomer. I'm not talking about my teenage years, though. I'm talking about key tools in modern software infrastructure like Docker or Kubernetes.

## I knew nothing about software development

When I began my deep dive into "actual" professional web development in 2022, I knew next to nothing about fancy things like Docker, cloud computing or K8s. Coming from the SAP industry and its proprietary technologies, I had never met a single usecase that required any of the aforementioned tools (although they would have been beneficial in most of them), and I'm pretty sure that most of my colleagues have never heard of such wizardry.

I could continue to rant about how far behind the entire industry evolving around SAP's products is and how that is almost entirely SAP's fault, but I digress.

In very early 2022 I switched teams within my employer and left the SAP industry for good. I helped start a new team that was tasked with providing web frontends for data science and AI models. I quickly realized that modern software development was mostly a black box to me. While telling myself that everybody puts their pants on the same way I started learning.

## Learning about the magic of Docker

I learn the most when doing things myself from start to finish, so I dug into things during my spare time as well. It wasn't long until I had set up my personal infrastructure to incorporate simple CI/CD pipelines that were able to build and deploy Docker images seamlessly. For the first time in forever, releasing software was no longer a manual process (yes, I was _that_ far behind). Needless to say I was stunned.

My pipelines were working nicely, but little did I realize that what I've built from GitHub actions, Docker Hub and docker-compose was far from being state of the art. By that time, my team and I have already been using Kubernetes in the form of OpenShift as well as Helm (in addition to Artifactory as our image registry). However – and I'm confident this is more common that most of us would like to admit – those were merely tools we were using, but did not have any deeper understanding of. For example, sometimes our build pipeline would fail due to some "Helm errors", but we neither knew what Helm was nor why it failed. Thankfully, we knew how to "fix" it - deleting the latest set of "secrets" in OpenShift and retriggering the pipeline would help for reasons we could only deem supernatural.

## The magical lands of Kubernetes

At the end of 2022 one of our projects went live. In the weeks before the rollout we could observe a shift in deployment pipelines and infrastructure, but were not directly involved into implementing the changes. We were wondering what ArgoCD was and why they had moved away from the tools that "everybody else was using" (our company's standard CI/CD pipeline product), but since we were not the ones having to maintain it, we didn't bother thinking about it too much.

In early 2023, we were asked to help with yet another project. Here I was confronted with yet another infrastructure ecosystem: The team had their own Kubernetes cluster that they used for running all sorts of services, from Devspace containers to the live application. For Deployment, they used a pipeline consisting of Docker, Artifactory and Helm as well as Flux running on the cluster (an approach called GitOps as I would soon learn). Again, things were a blackbox to me. I was annoyed by how little I understood, so I – again – dug into things.

<Image
src="/blog/2023-05-15-kubernetes/bilbo-ventures-into-kube-land.png"
title="Bilbo Baggins ventures into the magical lands of Kubernetes"

> I asked Dall-E to create a picture of Bilbo Baggins embarking into the magical
> lands of Kubernetes and GitOps. It failed hilariously.
> </Image>
