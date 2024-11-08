import fetch from 'node-fetch';
import fs from 'fs/promises';

const errorMessage = `
com.example.webapp.TimeoutError: Error {
  message='Timeout 45000ms exceeded.
  name='TimeoutError
  stack='TimeoutError: Timeout 45000ms exceeded.
    at TaskRunner.execute (/app/node_modules/webapp-core/lib/server/taskRunner.js:65:28)
    at Element.click (/app/node_modules/webapp-core/lib/server/elements.js:890:21)
    at ElementDispatcher.click (/app/node_modules/webapp-core/lib/server/dispatchers/elementDispatcher.js:145:32)
    at ElementDispatcher._handleRequest (/app/node_modules/webapp-core/lib/server/dispatchers/dispatcher.js:87:38)
    at DispatcherConnection.handle (/app/node_modules/webapp-core/lib/server/dispatchers/dispatcher.js:345:37)
}
Call log:
- waiting for locator('[id*="submitButton"]').first()

\tat com.example.webapp.impl.ResultHandler.get(ResultHandler.java:48)
\tat com.example.webapp.impl.ConnectionManager.runUntil(ConnectionManager.java:115)
\tat com.example.webapp.impl.Connection.sendRequest(Connection.java:125)
\tat com.example.webapp.impl.ElementImpl.clickImpl(ElementImpl.java:245)
\tat com.example.webapp.impl.PageImpl.lambda$click$15(PageImpl.java:580)
\tat com.example.webapp.impl.LoggingSupport.lambda$withLogging$0(LoggingSupport.java:30)
\tat com.example.webapp.impl.LoggingSupport.withLogging(LoggingSupport.java:42)
\tat com.example.webapp.impl.ConnectionManager.withLogging(ConnectionManager.java:85)
\tat com.example.webapp.impl.LoggingSupport.withLogging(LoggingSupport.java:29)
\tat com.example.webapp.impl.PageImpl.click(PageImpl.java:579)
\tat com.example.webapp.Page.click(Page.java:3850)
\tat app.actions.ElementActions.clickElementById(ElementActions.java:150)
\tat org.codehaus.groovy.vmplugin.v8.IndyInterface.selectMethod(IndyInterface.java:350)
\tat org.codehaus.groovy.vmplugin.v8.IndyInterface.fromCache(IndyInterface.java:316)
\tat components.userprofile.ProfileComponent$_verifyProfileUpdate_closure3.doCall(ProfileComponent.groovy:90)
\tat java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:100)
\tat java.base/java.lang.reflect.Method.invoke(Method.java:577)
\tat org.codehaus.groovy.reflection.CachedMethod.invoke(CachedMethod.java:340)
\tat groovy.lang.MetaMethod.doMethodInvoke(MetaMethod.java:325)
\tat org.codehaus.groovy.runtime.metaclass.ClosureMetaClass.invokeMethod(ClosureMetaClass.java:276)
\tat groovy.lang.MetaClassImpl.invokeMethod(MetaClassImpl.java:1004)
\tat groovy.lang.Closure.call(Closure.java:430)
\tat org.codehaus.groovy.runtime.DefaultGroovyMethods.eachWithIndex(DefaultGroovyMethods.java:2299)
\tat org.codehaus.groovy.runtime.DefaultGroovyMethods.eachWithIndex(DefaultGroovyMethods.java:2279)
\tat org.codehaus.groovy.runtime.DefaultGroovyMethods.eachWithIndex(DefaultGroovyMethods.java:2329)
\tat org.codehaus.groovy.runtime.dgm$220.doMethodInvoke(Unknown Source)
\tat org.codehaus.groovy.vmplugin.v8.IndyInterface.selectMethod(IndyInterface.java:350)
\tat org.codehaus.groovy.vmplugin.v8.IndyInterface.fromCache(IndyInterface.java:316)
\tat components.userprofile.ProfileComponent.verifyProfileUpdate(ProfileComponent.groovy:89)
\tat java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:100)
\tat java.base/java.lang.reflect.Method.invoke(Method.java:577)
\tat org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:348)
\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:710)
\tat components.userprofile.ProfileComponent$$SpringCGLIB$$0.verifyProfileUpdate(<generated>)
\tat org.codehaus.groovy.vmplugin.v8.IndyInterface.selectMethod(IndyInterface.java:350)
\tat org.codehaus.groovy.vmplugin.v8.IndyInterface.fromCache(IndyInterface.java:316)
\tat userprofile.ProfileTests.verifyProfileUpdateFunctionality(ProfileTests.groovy:89)
\tat java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:100)
\tat java.base/java.lang.reflect.Method.invoke(Method.java:577)
\tat org.testng.internal.invokers.MethodInvocationHelper.invokeMethod(MethodInvocationHelper.java:136)
\tat org.testng.internal.invokers.MethodInvocationHelper$1.runTestMethod(MethodInvocationHelper.java:255)
\tat org.springframework.test.context.testng.AbstractTestNGSpringContextTests.run(AbstractTestNGSpringContextTests.java:151)
\tat org.testng.internal.invokers.MethodInvocationHelper.invokeHookable(MethodInvocationHelper.java:269)
\tat org.testng.internal.invokers.TestInvoker.invokeMethod(TestInvoker.java:653)
\tat org.testng.internal.invokers.TestInvoker.retryFailed(TestInvoker.java:246)
\tat org.testng.internal.invokers.MethodRunner.runInSequence(MethodRunner.java:73)
\tat org.testng.internal.invokers.TestInvoker$MethodInvocationAgent.invoke(TestInvoker.java:958)
\tat org.testng.internal.invokers.TestInvoker.invokeTestMethods(TestInvoker.java:198)
\tat org.testng.internal.invokers.TestMethodWorker.invokeTestMethods(TestMethodWorker.java:145)
\tat org.testng.internal.invokers.TestMethodWorker.run(TestMethodWorker.java:125)
\tat java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:569)
\tat java.base/java.util.concurrent.FutureTask.run(FutureTask.java:314)
\tat org.testng.internal.thread.graph.TestNGFutureTask.run(TestNGFutureTask.java:21)
\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1141)
\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:639)
\tat java.base/java.lang.Thread.run(Thread.java:1576)
Caused by: com.example.webapp.TimeoutError: Error {
  message='Timeout 45000ms exceeded.
  name='TimeoutError
  stack='TimeoutError: Timeout 45000ms exceeded.
    at TaskRunner.execute (/app/node_modules/webapp-core/lib/server/taskRunner.js:65:28)
    at Element.click (/app/node_modules/webapp-core/lib/server/elements.js:890:21)
    at ElementDispatcher.click (/app/node_modules/webapp-core/lib/server/dispatchers/elementDispatcher.js:145:32)
    at ElementDispatcher._handleRequest (/app/node_modules/webapp-core/lib/server/dispatchers/dispatcher.js:87:38)
    at DispatcherConnection.handle (/app/node_modules/webapp-core/lib/server/dispatchers/dispatcher.js:345:37)
}
Call log:
- waiting for locator('[id*="submitButton"]').first()

\tat com.example.webapp.impl.Connection.handle(Connection.java:250)
\tat com.example.webapp.impl.Connection.processOneMessage(Connection.java:207)
\tat com.example.webapp.impl.ConnectionManager.runUntil(ConnectionManager.java:113)
\t... 55 more

`;

async function analyzeTestResult() {
    try {
        const response = await fetch('http://localhost:23500/ai/test-result/analyse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMessage: errorMessage
            })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const responseJson = await response.json();
        const analysis = responseJson.analysis;

        const dataToWrite = typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2);
        await fs.writeFile('test-result.md', dataToWrite);
        console.log('Response successfully saved to response.md');

    } catch (error) {
        console.error('Error:', error);
    }
}

analyzeTestResult();
