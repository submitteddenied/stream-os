#(On Windows) You must have both `tf` and `tf.exe` on your path for this to work!
# Use `ln -s tf tf.exe` to create a link called `tf.exe` pointing to your existing `tf` binary
tf apply -auto-approve

cd .. #up to workspace dir

rm -rf dist

npm run build

aws s3 sync dist/frontend/ s3://`tf output -state=deploy/terraform.tfstate bucket_name`/ --delete