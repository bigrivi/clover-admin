ng build --environment=prod
rm -rf /usr/local/apache-tomcat-8.5.4/webapps/ngApp
cp -rf dist/ /usr/local/apache-tomcat-8.5.4/webapps/ngApp