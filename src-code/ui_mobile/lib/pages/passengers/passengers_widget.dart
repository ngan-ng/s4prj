import '/backend/api_requests/api_calls.dart';
import '/components/booking/pax_form/pax_form_widget.dart';
import '/flutter_flow/flutter_flow_animations.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/custom_functions.dart' as functions;
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'passengers_model.dart';
export 'passengers_model.dart';

class PassengersWidget extends StatefulWidget {
  const PassengersWidget({Key? key}) : super(key: key);

  @override
  _PassengersWidgetState createState() => _PassengersWidgetState();
}

class _PassengersWidgetState extends State<PassengersWidget>
    with TickerProviderStateMixin {
  late PassengersModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  final animationsMap = {
    'textOnPageLoadAnimation': AnimationInfo(
      trigger: AnimationTrigger.onPageLoad,
      effects: [
        MoveEffect(
          curve: Curves.easeInOut,
          delay: 80.ms,
          duration: 600.ms,
          begin: Offset(0.0, 0.0),
          end: Offset(0.0, 0.0),
        ),
      ],
    ),
  };

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => PassengersModel());
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(_model.unfocusNode),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).primaryBackground,
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(60.0),
          child: AppBar(
            backgroundColor: FlutterFlowTheme.of(context).primary,
            automaticallyImplyLeading: false,
            leading: Align(
              alignment: AlignmentDirectional(0.0, 0.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8.0),
                child: Image.asset(
                  'assets/images/logo.png',
                  width: 339.0,
                  height: 200.0,
                  fit: BoxFit.contain,
                ),
              ),
            ),
            title: Align(
              alignment: AlignmentDirectional(-1.0, 0.0),
              child: AutoSizeText(
                'FS Airlines',
                textAlign: TextAlign.start,
                style: FlutterFlowTheme.of(context).headlineMedium.override(
                      fontFamily: 'Outfit',
                      color: FlutterFlowTheme.of(context).primaryBackground,
                      lineHeight: 2.0,
                    ),
              ).animateOnPageLoad(animationsMap['textOnPageLoadAnimation']!),
            ),
            actions: [],
            centerTitle: false,
            elevation: 3.0,
          ),
        ),
        body: SafeArea(
          top: true,
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(10.0, 10.0, 10.0, 10.0),
                child: Builder(
                  builder: (context) {
                    final bookings =
                        FFAppState().bookings.map((e) => e).toList();
                    return ListView.separated(
                      padding: EdgeInsets.zero,
                      shrinkWrap: true,
                      scrollDirection: Axis.vertical,
                      itemCount: bookings.length,
                      separatorBuilder: (_, __) => SizedBox(height: 5.0),
                      itemBuilder: (context, bookingsIndex) {
                        final bookingsItem = bookings[bookingsIndex];
                        return Visibility(
                          visible: getJsonField(
                                bookingsItem,
                                r'''$''',
                              ) !=
                              null,
                          child: Card(
                            clipBehavior: Clip.antiAliasWithSaveLayer,
                            color: FlutterFlowTheme.of(context)
                                .secondaryBackground,
                            elevation: 4.0,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.max,
                              children: [
                                Column(
                                  mainAxisSize: MainAxisSize.max,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Align(
                                      alignment:
                                          AlignmentDirectional(-1.0, 0.0),
                                      child: Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            10.0, 5.0, 0.0, 0.0),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.max,
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            Align(
                                              alignment: AlignmentDirectional(
                                                  -1.0, 0.0),
                                              child: Text(
                                                'Passenger ',
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily:
                                                              'Readex Pro',
                                                          fontSize: 16.0,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                              ),
                                            ),
                                            Builder(
                                              builder: (context) {
                                                if (getJsonField(
                                                      bookingsItem,
                                                      r'''$.gender''',
                                                    ) ==
                                                    getJsonField(
                                                      FFAppState()
                                                          .bookings
                                                          .first,
                                                      r'''$.gender''',
                                                    )) {
                                                  return Icon(
                                                    Icons.person,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .secondaryText,
                                                    size: 24.0,
                                                  );
                                                } else if (getJsonField(
                                                      bookingsItem,
                                                      r'''$.gender''',
                                                    ) ==
                                                    _model.txtInf) {
                                                  return Icon(
                                                    Icons.child_care,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .secondaryText,
                                                    size: 24.0,
                                                  );
                                                } else {
                                                  return Icon(
                                                    Icons.accessibility,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .secondaryText,
                                                    size: 24.0,
                                                  );
                                                }
                                              },
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                    if (getJsonField(
                                          bookingsItem,
                                          r'''$''',
                                        ) !=
                                        null)
                                      Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            10.0, 0.0, 10.0, 5.0),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.max,
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            if (getJsonField(
                                                  bookingsItem,
                                                  r'''$.gender''',
                                                ) !=
                                                _model.txtInf)
                                              Text(
                                                getJsonField(
                                                  bookingsItem,
                                                  r'''$.title''',
                                                ).toString(),
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyMedium,
                                              ),
                                            if ((getJsonField(
                                                      bookingsItem,
                                                      r'''$.firstName''',
                                                    ) ==
                                                    null) &&
                                                (getJsonField(
                                                      bookingsItem,
                                                      r'''$.firstName''',
                                                    ) ==
                                                    ''))
                                              Text(
                                                '.',
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyMedium,
                                              ),
                                            RichText(
                                              text: TextSpan(
                                                children: [
                                                  TextSpan(
                                                    text: getJsonField(
                                                      bookingsItem,
                                                      r'''$.firstName''',
                                                    ).toString(),
                                                    style: FlutterFlowTheme.of(
                                                            context)
                                                        .bodyMedium
                                                        .override(
                                                          fontFamily:
                                                              'Readex Pro',
                                                          color: FlutterFlowTheme
                                                                  .of(context)
                                                              .primary,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                  ),
                                                  TextSpan(
                                                    text: ' ',
                                                    style: TextStyle(),
                                                  ),
                                                  TextSpan(
                                                    text: getJsonField(
                                                      bookingsItem,
                                                      r'''$.lastName''',
                                                    ).toString(),
                                                    style: TextStyle(
                                                      color: Color(0xDB4B39EF),
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      fontSize: 14.0,
                                                    ),
                                                  )
                                                ],
                                                style:
                                                    FlutterFlowTheme.of(context)
                                                        .bodyMedium,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                  ],
                                ),
                                Expanded(
                                  child: Align(
                                    alignment: AlignmentDirectional(1.0, 0.0),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          0.0, 5.0, 10.0, 5.0),
                                      child: FFButtonWidget(
                                        onPressed: () async {
                                          await showModalBottomSheet(
                                            isScrollControlled: true,
                                            backgroundColor: Colors.transparent,
                                            enableDrag: false,
                                            useSafeArea: true,
                                            context: context,
                                            builder: (context) {
                                              return GestureDetector(
                                                onTap: () =>
                                                    FocusScope.of(context)
                                                        .requestFocus(
                                                            _model.unfocusNode),
                                                child: Padding(
                                                  padding:
                                                      MediaQuery.viewInsetsOf(
                                                          context),
                                                  child: PaxFormWidget(
                                                    gender: getJsonField(
                                                      bookingsItem,
                                                      r'''$.gender''',
                                                    ).toString(),
                                                    index: bookingsIndex,
                                                  ),
                                                ),
                                              );
                                            },
                                          ).then((value) => setState(() {}));
                                        },
                                        text: 'Edit',
                                        icon: Icon(
                                          Icons.edit_square,
                                          size: 16.0,
                                        ),
                                        options: FFButtonOptions(
                                          width: 100.0,
                                          height: 40.0,
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  0.0, 0.0, 0.0, 0.0),
                                          iconPadding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  0.0, 0.0, 0.0, 0.0),
                                          color: FlutterFlowTheme.of(context)
                                              .primary,
                                          textStyle:
                                              FlutterFlowTheme.of(context)
                                                  .titleSmall
                                                  .override(
                                                    fontFamily: 'Readex Pro',
                                                    color: Colors.white,
                                                    fontSize: 15.0,
                                                    fontWeight: FontWeight.w300,
                                                  ),
                                          elevation: 3.0,
                                          borderSide: BorderSide(
                                            color: Colors.transparent,
                                            width: 1.0,
                                          ),
                                          borderRadius:
                                              BorderRadius.circular(8.0),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
              Expanded(
                child: Align(
                  alignment: AlignmentDirectional(-1.0, 1.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Align(
                          alignment: AlignmentDirectional(-1.0, 1.0),
                          child: Padding(
                            padding: EdgeInsetsDirectional.fromSTEB(
                                10.0, 0.0, 0.0, 10.0),
                            child: FlutterFlowIconButton(
                              borderColor: Color(0xBD4B39EF),
                              borderRadius: 15.0,
                              borderWidth: 1.0,
                              buttonSize: 48.0,
                              fillColor: FlutterFlowTheme.of(context).alternate,
                              hoverColor: FlutterFlowTheme.of(context).primary,
                              icon: Icon(
                                Icons.arrow_back_ios,
                                color: Color(0xBD4B39EF),
                                size: 24.0,
                              ),
                              showLoadingIndicator: true,
                              onPressed: () async {
                                context.safePop();
                              },
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Align(
                          alignment: AlignmentDirectional(1.0, 1.0),
                          child: Padding(
                            padding: EdgeInsetsDirectional.fromSTEB(
                                0.0, 0.0, 10.0, 10.0),
                            child: FFButtonWidget(
                              onPressed: () async {
                                var _shouldSetState = false;
                                _model.createBookingsResult =
                                    await CreateBookingsCall.call(
                                  bookingsJson: functions.finalizeBookings(
                                      FFAppState().bookings.toList(),
                                      getJsonField(
                                        FFAppState().departFlight,
                                        r'''$''',
                                      ),
                                      getJsonField(
                                        FFAppState().returnFlight,
                                        r'''$''',
                                      )),
                                );
                                _shouldSetState = true;
                                if ((_model.createBookingsResult?.succeeded ??
                                    true)) {
                                  context.pushNamed(
                                    'SeatAssignment',
                                    queryParameters: {
                                      'passengers': serializeParam(
                                        (_model.createBookingsResult
                                                ?.jsonBody ??
                                            ''),
                                        ParamType.JSON,
                                        true,
                                      ),
                                    }.withoutNulls,
                                  );
                                } else {
                                  await showDialog(
                                    context: context,
                                    builder: (alertDialogContext) {
                                      return AlertDialog(
                                        title: Text('Error Dialog'),
                                        content: Text((_model
                                                .createBookingsResult
                                                ?.bodyText ??
                                            '')),
                                        actions: [
                                          TextButton(
                                            onPressed: () => Navigator.pop(
                                                alertDialogContext),
                                            child: Text('Ok'),
                                          ),
                                        ],
                                      );
                                    },
                                  );
                                  if (_shouldSetState) setState(() {});
                                  return;
                                }

                                if (_shouldSetState) setState(() {});
                              },
                              text: 'Next',
                              options: FFButtonOptions(
                                width: 110.0,
                                height: 48.0,
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 0.0, 0.0, 0.0),
                                iconPadding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 0.0, 0.0, 0.0),
                                color: FlutterFlowTheme.of(context).primary,
                                textStyle: FlutterFlowTheme.of(context)
                                    .titleSmall
                                    .override(
                                      fontFamily: 'Readex Pro',
                                      color: Colors.white,
                                    ),
                                elevation: 3.0,
                                borderSide: BorderSide(
                                  color: Colors.transparent,
                                  width: 1.0,
                                ),
                                borderRadius: BorderRadius.circular(8.0),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
