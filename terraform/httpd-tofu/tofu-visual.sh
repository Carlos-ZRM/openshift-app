tofu plan -out=plan.out
tofu show -json plan.out > plan.json
terraform-visual --plan plan.json